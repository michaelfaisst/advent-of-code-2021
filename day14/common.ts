import { readFileSync } from "fs";
import { join } from "path";

export const readInput = () => {
    const input = readFileSync(join(__dirname, "input.txt"), "utf-8").split(
        "\n\n"
    );

    const polymerTemplate = input[0];

    const rulesMap = input[1].split("\n").reduce((acc, line) => {
        const lineSplit = line.split(" -> ");
        acc[lineSplit[0]] = lineSplit[1];

        return acc;
    }, {} as Record<string, string>);

    return { polymerTemplate, rulesMap };
};
