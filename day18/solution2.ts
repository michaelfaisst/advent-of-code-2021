import { readFileSync } from "fs";
import { join } from "path";
import { add, parseTree, reduce, getMagnitude } from "./common";

const trees = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\n");

let maxMagnitude = 0;

for (let i = 0; i < trees.length; i++) {
    for (let j = 0; j < trees.length; j++) {
        if (i === j) continue;

        const sum = add(parseTree(trees[i]), parseTree(trees[j]));
        reduce(sum);
        const magnitude = getMagnitude(sum);

        if (magnitude > maxMagnitude) {
            maxMagnitude = magnitude;
        }
    }
}

export const result = maxMagnitude;
