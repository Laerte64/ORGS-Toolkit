import Matrix from "./matrix";
import ObjectiveFunction, { OptimizationType } from "./objective_function";
import Restriction from "./restriction";
import Variable from "./variable";

export default class SimplexState {

    orgVars: Variable[];
    orgRest: Restriction[];
    orgObjF: ObjectiveFunction;

    newVars: Variable[];
    newRest: Restriction[];
    newObjF: ObjectiveFunction;

    dupVars: boolean[];

    numX: number;
    numS: number;
    numA: number;

    matrix: Matrix;
    bases: number[];

    constructor () {
        this.orgVars = [];
        this.orgRest = [];
        this.orgObjF = new ObjectiveFunction(OptimizationType.maximum, []);
        
        this.newVars = [];
        this.newRest = [];
        this.newObjF = new ObjectiveFunction(OptimizationType.maximum, []);

        this.dupVars = [];
        
        this.numX = 0;
        this.numS = 0;
        this.numA = 0;

        this.matrix = new Matrix(0, 0);
        this.bases = [];
    }
}