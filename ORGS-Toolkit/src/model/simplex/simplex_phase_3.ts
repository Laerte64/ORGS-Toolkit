import ObjectiveFunction, { OptimizationType } from "./objective_function";
import SimplexPhase from "./simplex_phase";
import SimplexState from "./simplex_state";
import Variable from "./variable";

export default class SimplexPhase3 implements SimplexPhase {
    
    #state: SimplexState;

    constructor(state: SimplexState) {
        this.#state = state;
    }
    
    iterate(): SimplexPhase {
        let candidates = this.#findCandidates();
        if (candidates.length === 0)
            return this;
        throw new Error("Multiple Solutions not implemented yet.");
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

        return table;
    }

    get feasible(): boolean { return true }

    get optimal(): boolean { return true }
    
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
    get #rowB() { return this.#state.matrix.data.slice(1, this.#state.matrix.rows) }

    #findCandidates(): number[] {
        let candidates: number[] = [];
        this.#rowZ.forEach((c, i) => {
            if (c !== 0)
                return;
            if (this.#state.bases.find(b => b === i) === -1)
                candidates.push(i);
        });
        return candidates;
    }

}