import ObjectiveFunction from "./objective_function";
import Variable from "./variable";

export default interface SimplexPhase {
    iterate(): SimplexPhase;
    get table(): (string | number)[][];
    get feasible(): boolean;
    get optimal(): boolean;
    get solution(): [Variable[], ObjectiveFunction];
}