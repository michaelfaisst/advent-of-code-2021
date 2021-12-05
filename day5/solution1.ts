import { readFileSync } from "fs";
import { join } from "path";
import { IMap, ILine, traverseLine, mapLine } from "./commons";

const lines = readFileSync(join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map(mapLine)
    .filter(
        (x): x is ILine => x != null && (x.delta.x === 0 || x.delta.y === 0)
    );

const map: IMap = {};

for (const line of lines) {
    traverseLine(map, line);
}

let overlaps = 0;

for (let x in map) {
    for (let y in map) {
        if (map[x][y] > 1) {
            overlaps++;
        }
    }
}

export const result = overlaps;
