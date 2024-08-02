import ObjectiveFunction from "./objective_function";
import Restriction from "./restriction";
import SimplexBuilder from "./simplex_builder";
import SimplexPhase from "./simplex_phase";
import Variable from "./variable";

export default class Simplex {

    #phase: SimplexPhase;

    constructor (vars: Variable[], objF: ObjectiveFunction, rest: Restriction[]) {
        this.#phase = new SimplexBuilder().build(vars, objF, rest);
    }

    iterate() {
        this.#phase = this.#phase.iterate();
    }

    get table(): (string | number)[][] { return this.#phase.table; }

    get feasible(): boolean { return this.#phase.feasible }
    get optimal(): boolean { return this.#phase.optimal }
    get solution(): [Variable[], ObjectiveFunction] { return this.#phase.solution }
}