import { readFileSync } from "fs";
import { join } from "path";
import {
    closingCharacters,
    IMap,
    isPairMatching,
    openingCharacters
} from "./common";

const pointMapping: IMap = {
    ")": 1,
    "]": 2,
    "}": 3,
    ">": 4
};

const getClosingCharacter = (opening: string) => {
    return closingCharacters[openingCharacters.indexOf(opening)];
};

const getFixForIncomplete = (line: string): string[] | undefined => {
    const openingStack: string[] = [];

    for (const c of line.split("")) {
        if (openingCharacters.includes(c)) {
            openingStack.push(c);
        } else {
            const opening = openingStack.pop();

            if (!opening || !isPairMatching(opening, c)) {
                return;
            }
        }
    }

    if (openingStack.length === 0) {
        return;
    }

    const closingChars: string[] = [];

    while (openingStack.length > 0) {
        closingChars.push(getClosingCharacter(openingStack.pop()!));
    }

    return closingChars;
};

const lines = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\n");
const scores: number[] = [];

for (const line of lines) {
    const fix = getFixForIncomplete(line);

    if (fix) {
        scores.push(
            fix.reduce((acc, c) => {
                return acc * 5 + pointMapping[c];
            }, 0)
        );
    }
}

scores.sort((a, b) => a - b);

export const result = scores[Math.floor(scores.length / 2)];
