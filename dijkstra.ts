import { Infinity } from 'typescript-is-infinite';

class Dijkstra {
    private size: number;
    private vertices: string[];
    private graph: number[][];
    private start: number;

    constructor(vertices: string[], edges: number[][], start: number) {
        this.size = vertices.length;
        this.vertices = vertices;
        this.graph = edges;
        this.start = start;
    }

    private showSolution(distances: number[]): void {
        console.log(`Menores distâncias de ${this.vertices[this.start]} até todos os outros`);
        for (let vertex = 0; vertex < this.size; vertex++) {
            console.log(`${this.vertices[vertex]} ${distances[vertex]}`);
        }
    }

    private minimumDistance(distance: number[], visited: boolean[]): number {
        let minimum = Infinity;
        let minimumIndex = -1;
        for (let vertex = 0; vertex < this.size; vertex++) {
            if (distance[vertex] < minimum && !visited[vertex]) {
                minimum = distance[vertex];
                minimumIndex = vertex;
            }
        }
        return minimumIndex;
    }

    public dijkstra(): void {
        const distance: number[] = new Array(this.size).fill(Infinity);
        distance[this.start] = 0;
        const visited: boolean[] = new Array(this.size).fill(false);

        for (let _ = 0; _ < this.size; _++) {
            const minimumIndex = this.minimumDistance(distance, visited);
            visited[minimumIndex] = true;
            for (let vertex = 0; vertex < this.size; vertex++) {
                if (this.graph[minimumIndex][vertex] > 0 && !visited[vertex] && distance[vertex] > distance[minimumIndex] + this.graph[minimumIndex][vertex]) {
                    distance[vertex] = distance[minimumIndex] + this.graph[minimumIndex][vertex];
                }
            }
        }

        this.showSolution(distance);
    }
}

