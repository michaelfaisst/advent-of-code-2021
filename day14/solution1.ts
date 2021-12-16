import { readInput } from "../day14/common";

const process = (
    polymer: string,
    rulesMap: Record<string, string>,
    steps: number
) => {
    for (let step = 0; step < steps; step++) {
        for (let i = 0; i < polymer.length - 1; i += 2) {
            const replacement = rulesMap[`${polymer[i]}${polymer[i + 1]}`];
            polymer =
                polymer.slice(0, i + 1) + replacement + polymer.slice(i + 1);
        }
    }

    return polymer;
};

const { polymerTemplate, rulesMap } = readInput();
const polymer = process(polymerTemplate, rulesMap, 10);

const charCounts = polymer.split("").reduce((acc, val) => {
    acc[val] = (acc[val] || 0) + 1;
    return acc;
}, {} as Record<string, number>);

const minValue = Math.min(...Object.values(charCounts));
const maxValue = Math.max(...Object.values(charCounts));

export const result = maxValue - minValue;
