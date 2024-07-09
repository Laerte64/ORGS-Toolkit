export default class Matrix {
    
    rows: number;
    columns: number;
    data: number[][];

    constructor(rows: number, columns: number) {
        this.rows = rows;
        this.columns = columns;
        
        this.data = new Array(this.rows);
        for (let i = 0; i < this.rows; i++)
            this.data[i] = new Array(this.columns).fill(0);
    }

    divide(row: number, divisor: number): undefined {
        for (let i = 0; i < this.columns; i++)
            this.data[row][i] /= divisor;
    }

    subtract(minuhend: number, subtrahend: number, multiplier: number = 1) {
        for (let i = 0; i < this.columns; i++)
            this.data[minuhend][i] -= multiplier * this.data[subtrahend][i];
    }
}