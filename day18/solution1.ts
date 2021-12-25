import { readFileSync } from "fs";
import { join } from "path";
import { add, parseTree, reduce, getMagnitude } from "./common";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\n");
let tree = parseTree(input[0]);

for (let i = 1; i < input.length; i++) {
    tree = add(tree, parseTree(input[i]));
    reduce(tree);
}

export const result = getMagnitude(tree);
