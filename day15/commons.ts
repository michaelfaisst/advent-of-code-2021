import { readFileSync } from "fs";
import { join } from "path";
import { PriorityQueue } from "./priority-queue";

export interface IPosition {
    row: number;
    col: number;
}

export interface ICell {
    row: number;
    col: number;
    risk: number;
    visited: boolean;
    distance: number;
}

export const readMap = () => {
    return readFileSync(join(__dirname, "input.txt"), "utf-8")
        .split("\n")
        .map((line, row) =>
            line.split("").map((value, col) => {
                return {
                    row,
                    col,
                    risk: +value,
                    visited: false,
                    distance: Number.MAX_VALUE
                } as ICell;
            })
        );
};

const getUnvisitedNeighbours = (pos: IPosition, map: ICell[][]) => {
    return [
        { row: pos.row + 1, col: pos.col },
        { row: pos.row, col: pos.col + 1 },
        { row: pos.row - 1, col: pos.col },
        { row: pos.row, col: pos.col - 1 }
    ]
        .map((pos) => map[pos.row]?.[pos.col])
        .filter((cell): cell is ICell => cell != null && !cell.visited);
};

export const calculateShortestPath = (map: ICell[][]) => {
    let currentPos: IPosition = { row: 0, col: 0 };
    let finalPos: IPosition = { row: map.length - 1, col: map[0].length - 1 };

    map[0][0].distance = 0;

    const priorityQueue = new PriorityQueue();
    priorityQueue.enqueue(map[0][0]);

    while (!priorityQueue.isEmpty()) {
        const neighbours = getUnvisitedNeighbours(currentPos, map);

        neighbours.forEach((neighbour) => {
            const distance =
                map[currentPos.row][currentPos.col].distance +
                map[neighbour.row][neighbour.col].risk;
            if (distance < map[neighbour.row][neighbour.col].distance) {
                map[neighbour.row][neighbour.col].distance = distance;
                priorityQueue.enqueue(map[neighbour.row][neighbour.col]);
            }
        });

        map[currentPos.row][currentPos.col].visited = true;

        if (
            currentPos.row === finalPos.row &&
            currentPos.col === finalPos.col
        ) {
            break;
        } else {
            const newNode = priorityQueue.dequeue();

            if (newNode) {
                currentPos = { row: newNode.row, col: newNode.col };
            } else {
                break;
            }
        }
    }

    return map[finalPos.row][finalPos.col].distance;
};
