import { readFileSync } from "fs";
import { join } from "path";
import { isLowPoint } from "./common";

const map = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map((line) => line.split("").map(Number));

let result = 0;

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
        if (isLowPoint(map, { x: row, y: col })) {
            result += map[row][col] + 1;
        }
    }
}

export { result };
