import Matrix from "./matrix";
import ObjectiveFunction, { OptimizationType } from "./objective_function";
import SimplexPhase from "./simplex_phase";
import SimplexPhase2 from "./simplex_phase_2";
import SimplexState from "./simplex_state";
import Variable from "./variable";

export default class SimplexPhase1 implements SimplexPhase {

    #state: SimplexState

    constructor(state: SimplexState) {
        this.#state = state;
        this.#updateSolution();
    }

    iterate(): SimplexPhase {
        
        let nextBasic = 0;
        this.#rowW.slice(0, this.#rowW.length - 1).forEach((v, i) => { if (v > this.#rowW[nextBasic]) nextBasic = i} );

        let lastBasic = 0;
        for (let i = 0; i < this.#state.bases.length; i++)
            if (this.#rowB[i][nextBasic] > 0)
            {
                lastBasic = i;
                break;
            }
        for (let i = lastBasic + 1; i < this.#state.bases.length; i++)
            if (this.#rowB[i][nextBasic] > 0)
                if (this.#BProportion(i, nextBasic) < this.#BProportion(lastBasic, nextBasic))
                    lastBasic = i;
        if (this.#rowB[lastBasic][nextBasic] <= 0)
            throw Error("Invalid Iteration");

        this.#state.matrix.divide(lastBasic + 1, this.#rowB[lastBasic][nextBasic]);
        this.#state.matrix.subtract(0, lastBasic + 1, this.#rowZ[nextBasic]);
        this.#rowB.forEach((r, i) => {
            if (i === lastBasic)
                return;
            this.#state.matrix.subtract(i + 1, lastBasic + 1, r[nextBasic]);
        });
        this.#state.matrix.subtract(this.#state.matrix.rows - 1, lastBasic + 1, this.#rowW[nextBasic]);
        this.#state.bases[lastBasic] = nextBasic;

        this.#updateSolution();

        let next = 0;
        this.#rowW.slice(0, this.#rowW.length - 1).forEach((v, i) => { if (v > this.#rowW[next]) next = i} );

        if (this.#rowW[next] <= 0)
        {
            if (this.#rowW[this.#state.matrix.columns - 1] !== 0)
                throw Error("Impossible Solution");

            this.#removeArtificials();
            return new SimplexPhase2(this.#state);
        }

        return this;
    }

    get table(): (string | number)[][] {
        let table = [];
        table.push([""]);
        this.#state.newVars.forEach(v => table[0].push(v.name));
        table[0].push("B");

        table.push(["Z", ...this.#state.matrix.data[0]]);

        this.#state.bases.forEach((b, i) => {
            table.push([this.#state.newVars[b].name, ...this.#state.matrix.data[i + 1]])
        });

        table.push(["W", ...this.#state.matrix.data[this.#state.matrix.rows - 1]]);
        return table;
    }

    get feasible(): boolean { return false }

    get optimal(): boolean { return false }

    get solution(): [Variable[], ObjectiveFunction] {

        this.#state.orgObjF.value = this.#state.newObjF.value;
        if (this.#state.orgObjF.type === OptimizationType.minimum)
            this.#state.orgObjF.value *= -1;
        let i = 0;
        this.#state.orgVars.forEach(v => {
            v.value = this.#state.newVars[i].value;
            if (this.#state.dupVars[i++])
            {
                v.value -= this.#state.newVars[i++].value;
            }
        });
        return [this.#state.orgVars.map(v => v.copy), this.#state.orgObjF.copy];
    }

    #updateSolution() {
        this.#state.newVars.forEach(v => v.value = 0);
        this.#state.bases.forEach((b, i) => this.#state.newVars[b].value = this.#state.matrix.data[i + 1][this.#state.matrix.columns - 1]);
        this.#state.newObjF.value = -this.#rowZ[this.#state.matrix.columns - 1];
    }

    get #rowZ() { return this.#state.matrix.data[0] }
    get #rowB() { return this.#state.matrix.data.slice(1, this.#state.matrix.rows - 1) }
    get #rowW() { return this.#state.matrix.data[this.#state.matrix.rows - 1] }

    #BProportion(row: number, column: number) {
        return Math.abs(this.#rowB[row][this.#state.matrix.columns - 1])/this.#rowB[row][column];
    }

    #removeArtificials() {
        this.#state.matrix.data.pop();
        this.#state.matrix.rows--;
        this.#state.matrix.data.forEach(r => {
            let b = r.pop();
            while (r.length > this.#state.numX + this.#state.numS)
                r.pop();
            r.push(b!);
        });
        while (this.#state.numA > 0)
        {
            this.#state.newVars.pop();
            this.#state.numA--;
            this.#state.matrix.columns--;
        }
    }
}