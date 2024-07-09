import Variable from "./variable"
import Restriction, { EqualityType } from "./restriction";
import ObjectiveFunction, { OptimizationType } from "./objective_function";
import SimplexState from "./simplex_state";
import Matrix from "./matrix";
import SimplexPhase from "./simplex_phase";
import SimplexPhase1 from "./simplex_phase_1";

export default class SimplexBuilder {

    #state: SimplexState;

    constructor() {
        this.#state = new SimplexState();
    }

    build(vars: Variable[], objF: ObjectiveFunction, rest: Restriction[]): SimplexPhase {
        this.#state.orgVars = vars.map(v => v.copy);
        this.#state.orgRest = rest.map(r => r.copy);
        this.#state.orgObjF = objF.copy;
        this.#state.newVars = [];
        this.#state.newRest = rest.map(r => r.copy);
        this.#state.newObjF = objF.copy;
        this.#checkVarNums();
        this.#adjustOptimization();
        this.#addLimits();
        this.#adjustInequalities();
        this.#dupVars();
        this.#addSlackAndArtificial();
        this.#createTable();
        return new SimplexPhase1(this.#state);
    }

    #checkVarNums() {
        let numVars = this.#state.orgVars.length;
        this.#state.orgRest.forEach(r => { if (r.coef.length !== numVars) throw Error("Incorrect number of coeficients"); });
        if (this.#state.orgObjF.coef.length !== numVars) throw Error("Incorrect number of coeficients");
    }

    #adjustOptimization() {
        this.#state.newObjF.type = OptimizationType.maximum;
        switch (this.#state.orgObjF.type) {
        case OptimizationType.maximum: 
            break;
        case OptimizationType.minimum:
            this.#state.newObjF.coef = this.#state.newObjF.coef.map(c => -c);
            break;
        case OptimizationType.equal:
            let r = new Restriction(EqualityType.lower, this.#state.orgObjF.coef.slice(), this.#state.orgObjF.value!);
            this.#state.newRest.push(r);
            break;
        }
    }

    #addLimits() {
        let numVars = this.#state.orgVars.length;
        this.#state.orgVars.forEach((v, i) => {
            let coef = new Array(numVars).fill(0);
            coef[i] = 1;
            if (v.upper !== Infinity)
                this.#state.newRest.push(new Restriction(EqualityType.lower, coef, v.upper));
            if (v.lower !== -Infinity && v.lower !== 0)
                this.#state.newRest.push(new Restriction(EqualityType.greater, coef, v.lower));
        });
    }

    #adjustInequalities() {
        this.#state.newRest.forEach(r => {
            if (r.limit >= 0)
                return;
            r.coef = r.coef.map(c => -c);
            r.limit *= -1;
            switch (r.type) {
            case EqualityType.greater:
                r.type = EqualityType.lower;
                break;
            case EqualityType.lower:
                r.type = EqualityType.greater;
                break;
            }
        });
    }

    #dupVars() {
        this.#state.orgVars.forEach(v => {
            if (v.lower >= 0) {
                this.#state.newVars.push(v.copy);
                this.#state.dupVars.push(false);
            }
            else {
                let nv = v.copy;
                nv.name += "'";
                this.#state.newVars.push(nv.copy);
                nv.name += "'";
                this.#state.newVars.push(nv.copy);
                this.#state.dupVars.push(true, true);
            }
        });

        this.#state.newRest = this.#state.newRest.reduce<Restriction[]>((rest, r) => {
            let coef: number[] = [];

            let i = 0, j = 0;
            while (j < r.coef.length) {
                coef.push(r.coef[j]);
                if (this.#state.dupVars[i]) {
                    coef.push(-r.coef[j]);
                    i++;
                }
                i++;
                j++;
            }

            rest.push(new Restriction(r.type, coef, r.limit));
            return rest;
        }, []);

        let coef: number[] = [];

        let i = 0, j = 0;
        while (j < this.#state.newObjF.coef.length) {
            coef.push(this.#state.newObjF.coef[j]);
            if (this.#state.dupVars[i]) {
                coef.push(-this.#state.newObjF.coef[j]);
                i++;
            }
            i++;
            j++;
        }
        this.#state.newObjF.coef = coef;
    }

    #addSlackAndArtificial() {
        this.#state.numX = this.#state.newVars.length;
        this.#state.newRest.forEach(r => {
            if (r.type === EqualityType.equal)
                return;
            this.#state.newVars.push(new Variable("S" + ++this.#state.numS, 0, Infinity));
            while (r.coef.length < this.#state.numX + this.#state.numS - 1)
                r.coef.push(0);
            if (r.type === EqualityType.lower)
                r.coef.push(1);
            else
                r.coef.push(-1);
        });
        this.#state.newRest.forEach(r => {
            if (r.type === EqualityType.lower)
                return;
            this.#state.newVars.push(new Variable("A" + ++this.#state.numA, 0, Infinity));
            while (r.coef.length < this.#state.numX + this.#state.numS + this.#state.numA - 1)
                r.coef.push(0);
            r.coef.push(1);
        });
        this.#state.newRest.forEach(r => {
            while (r.coef.length < this.#state.numX + this.#state.numS + this.#state.numA)
                r.coef.push(0);
        });
        while (this.#state.newObjF.coef.length < this.#state.numX + this.#state.numS + this.#state.numA)
            this.#state.newObjF.coef.push(0);
    }

    #createTable() {
        this.#state.bases = [];
        if (this.#state.numA === 0)
            this.#state.matrix = new Matrix(this.#state.newRest.length + 1, this.#state.newVars.length + 1);
        else
            this.#state.matrix = new Matrix(this.#state.newRest.length + 2, this.#state.newVars.length + 1);

        this.#state.matrix.data[0] = [...this.#state.newObjF.coef, 0];
        this.#state.newRest.forEach((r, i) => {
            this.#state.matrix.data[i + 1] = [...r.coef, r.limit];
            this.#state.bases.push(r.coef.length - r.coef.slice().reverse().findIndex(c => c === 1) - 1);
        });

        if (this.#state.numA === 0)
            return;

        this.#state.newRest.forEach(r => {
            if (r.type === EqualityType.lower)
                return;
            r.coef.slice(0, this.#state.numX + this.#state.numS).forEach((c, i) => {
                this.#state.matrix.data[this.#state.newRest.length + 1][i] += c;
            });
            this.#state.matrix.data[this.#state.matrix.rows - 1][this.#state.matrix.columns - 1] += r.limit;
        });
    }
}