export enum OptimizationType {
    maximum,
    minimum,
    equal
}

export default class ObjectiveFunction {
    type: OptimizationType;
    coef: number[];
    value: number;

    constructor(type: OptimizationType, coef: number[], value: number = 0) {
        this.type = type;
        this.coef = [...coef];
        this.value = value;
    }

    get copy() {
        return new ObjectiveFunction(this.type, this.coef, this.value);
    }
}