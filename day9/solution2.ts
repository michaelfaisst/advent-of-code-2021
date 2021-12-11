import { readFileSync } from "fs";
import { join } from "path";
import { getNeighbours, IPosition, isLowPoint } from "./common";

const traverseBasin = (
    map: number[][],
    pos: IPosition,
    positions: IPosition[]
) => {
    if (
        map[pos.x]?.[pos.y] == undefined ||
        map[pos.x][pos.y] === 9 ||
        positions.find((p) => p.x === pos.x && p.y === pos.y)
    ) {
        return positions;
    }

    positions.push(pos);
    getNeighbours(pos).forEach((neighbour) => {
        positions = traverseBasin(map, neighbour, positions);
    });

    return positions;
};

const map = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map((line) => line.split("").map(Number));

const basinSizes = [];

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
        const pos = { x: row, y: col };
        if (isLowPoint(map, pos)) {
            const basin = traverseBasin(map, pos, []);
            basinSizes.push(basin.length);
        }
    }
}

basinSizes.sort((a, b) => b - a);

export const result = basinSizes[0] * basinSizes[1] * basinSizes[2];
