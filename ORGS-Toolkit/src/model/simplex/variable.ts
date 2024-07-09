export default class Variable {
    
    name: string;
    lower: number;
    upper: number;
    value: number;

    constructor(name: string, lower = 0, upper = Infinity, value = 0) {
        this.name = name;
        this.lower = lower;
        this.upper = upper;
        this.value = value;
    }

    get copy(): Variable {
        return new Variable(this.name, this.lower, this.upper, this.value);
    }
}