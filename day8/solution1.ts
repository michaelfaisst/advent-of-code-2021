import { readFileSync } from "fs";
import { join } from "path";
import { ILine, createLine } from "./commons";

const countUniqueNumbers = (output: string[]) => {
    const uniqueNumbers = new Set<number>([2, 3, 4, 7]);
    return output.reduce((acc, value) => {
        return acc + (uniqueNumbers.has(value.length) ? 1 : 0);
    }, 0);
};

const input = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map(createLine)
    .filter((x): x is ILine => x != null);

const result = input.reduce((acc, line) => {
    return acc + countUniqueNumbers(line.output);
}, 0);

export { result };
