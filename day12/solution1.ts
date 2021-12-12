import { readFileSync } from "fs";
import { join } from "path";
import { ICave, ICaves, parseInput } from "./commons";

const paths: string[][] = [];

const traverse = (
    cave: ICave,
    caves: ICaves,
    path: string[],
    visited: string[]
) => {
    path.push(cave.name);

    if (!cave.big) {
        visited.push(cave.name);
    }

    if (cave.name === "end") {
        paths.push(path);
        return;
    }

    for (const connection of caves[cave.name].connections) {
        if (!caves[connection].big && visited.includes(connection)) {
            continue;
        }

        traverse(caves[connection], caves, [...path], [...visited]);
    }
};

const caves: ICaves = {};
const input = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\r\n");
parseInput(input, caves);

traverse(caves["start"], caves, [], []);

export const result = paths.length;
