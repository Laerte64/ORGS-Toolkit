import { maxSafeInteger } from 'lodash';

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

    private minDistance(distance: number[], visited: boolean[]): number {
        let minimum = maxSafeInteger;
        let minIndex = -1;
        for (let vertex = 0; vertex < this.size; vertex++) {
            if (distance[vertex] < minimum && !visited[vertex]) {
                minimum = distance[vertex];
                minIndex = vertex;
            }
        }
        return minIndex;
    }

    public dijkstra(destination: number): string[] {
        const distance: number[] = new Array(this.size).fill(maxSafeInteger);
        distance[this.start] = 0;
        const visited: boolean[] = new Array(this.size).fill(false);
        const predecessors: number[] = new Array(this.size).fill(-1);

        for (let _ = 0; _ < this.size; _++) {
            const minIndex = this.minDistance(distance, visited);
            visited[minIndex] = true;
            for (let vertex = 0; vertex < this.size; vertex++) {
                if (this.graph[minIndex][vertex] > 0 && !visited[vertex] && distance[vertex] > distance[minIndex] + this.graph[minIndex][vertex]) {
                    distance[vertex] = distance[minIndex] + this.graph[minIndex][vertex];
                    predecessors[vertex] = minIndex;
                }
            }
        }

        const path: string[] = [];
        let current = destination;
        while (current !== -1) {
            path.unshift(this.vertices[current]);
            current = predecessors[current];
        }

        return path;
    }
}

