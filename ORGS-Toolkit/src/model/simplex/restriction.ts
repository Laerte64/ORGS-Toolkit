export enum EqualityType {
    equal,
    lower,
    greater,
}

export default class Restriction {

    type: EqualityType;
    coef: number[];
    limit: number;

    constructor(type: EqualityType, coef: number[], limit: number) {
        this.type = type;
        this.coef = coef;
        this.limit = limit;
    }

    get copy(): Restriction {
        return new Restriction(this.type, [...this.coef], this.limit);
    }
}