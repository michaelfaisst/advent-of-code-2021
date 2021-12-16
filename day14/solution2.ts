import { readInput } from "../day14/common";

const process = (
    polymer: string,
    rulesMap: Record<string, string>,
    steps: number
) => {
    let polymerMap: Record<string, number> = {};
    let charMap: Record<string, number> = {};

    for (let i = 0; i < polymer.length; i++) {
        if (i < polymer.length - 1) {
            const pair = `${polymer[i]}${polymer[i + 1]}`;
            polymerMap[pair] = (polymerMap[pair] || 0) + 1;
        }

        charMap[polymer[i]] = (charMap[polymer[i]] || 0) + 1;
    }

    for (let step = 0; step < steps; step++) {
        const tempMap: Record<string, number> = {};

        for (let key in polymerMap) {
            const pair = key.split("");
            const replacement = rulesMap[key];

            charMap[replacement] =
                (charMap[replacement] || 0) + polymerMap[key];

            tempMap[`${pair[0]}${replacement}`] =
                polymerMap[key] + (tempMap[`${pair[0]}${replacement}`] || 0);

            tempMap[`${replacement}${pair[1]}`] =
                polymerMap[key] + (tempMap[`${replacement}${pair[1]}`] || 0);
        }

        polymerMap = tempMap;
    }

    return charMap;
};

const { polymerTemplate, rulesMap } = readInput();
const charMap = process(polymerTemplate, rulesMap, 40);

const minValue = Math.min(...Object.values(charMap));
const maxValue = Math.max(...Object.values(charMap));

export const result = maxValue - minValue;
