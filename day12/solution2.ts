import { readFileSync } from "fs";
import { join } from "path";
import { ICave, ICaves, parseInput } from "./commons";

const paths: string[][] = [];

const traverse = (
    cave: ICave,
    caves: ICaves,
    path: string[],
    visited: string[],
    specialCave: string
) => {
    path.push(cave.name);

    if (!cave.big) {
        visited.push(cave.name);
    }

    if (cave.name === "end") {
        paths.push(path);
        return;
    }

    for (const connection of cave.connections) {
        if (
            connection === specialCave &&
            visited.filter((x) => x === specialCave).length >= 2
        ) {
            continue;
        } else if (
            connection !== specialCave &&
            !caves[connection].big &&
            visited.includes(connection)
        ) {
            continue;
        }

        traverse(
            caves[connection],
            caves,
            [...path],
            [...visited],
            specialCave
        );
    }
};

const caves: ICaves = {};
const input = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\r\n");
parseInput(input, caves);

for (const smallCave of Object.entries(caves).filter(
    (v) => !v[1].big && v[0] !== "start" && v[0] !== "end"
)) {
    traverse(caves["start"], caves, [], [], smallCave[0]);
}

const uniquePaths = [...new Set(paths.map((x) => x.join("")))];

export const result = uniquePaths.length;
