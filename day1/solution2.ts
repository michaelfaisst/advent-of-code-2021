import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map(Number);

let increases = 0;

for (let i = 3; i < input.length; i++) {
    const group1 = input[i] + input[i - 1] + input[i - 2];
    const group2 = input[i - 1] + input[i - 2] + input[i - 3];
    if (group1 > group2) {
        increases++;
    }
}

export const result = increases;
