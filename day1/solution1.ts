import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map(Number);

let increases = 0;

for (let i = 1; i < input.length; i++) {
    if (input[i] > input[i - 1]) {
        increases++;
    }
}

export const result = increases;
