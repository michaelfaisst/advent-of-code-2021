import { readFileSync } from "fs";
import { join } from "path";
import { IMap, isPairMatching, openingCharacters } from "./common";

const pointMapping: IMap = {
    ")": 3,
    "]": 57,
    "}": 1197,
    ">": 25137
};

const getIncorrectCharacter = (line: string): string | undefined => {
    const openingStack: string[] = [];

    for (const c of line.split("")) {
        if (openingCharacters.includes(c)) {
            openingStack.push(c);
        } else {
            const opening = openingStack.pop();

            if (!opening || !isPairMatching(opening, c)) {
                return c;
            }
        }
    }

    return undefined;
};

const lines = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\n");
let result = 0;

for (const line of lines) {
    const incorrectCharacter = getIncorrectCharacter(line);

    if (incorrectCharacter) {
        result += pointMapping[incorrectCharacter];
    }
}

export { result };
