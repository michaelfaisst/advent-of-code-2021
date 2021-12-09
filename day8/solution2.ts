import { readFileSync } from "fs";
import { join } from "path";
import { createLine, ILine } from "./commons";

/* const characterMap = {
    // take the remaining 6 letter word
    0: "abcdeg",
    1: "ab",
    // take the last remaining 5 letter word
    2: "acdfg",
    // take all three 5 letter words
    // 3 is the only one that has 1 in it
    // bcdef acdfg abcdf = abcdf
    3: "abcdf",
    4: "abef",
    // take the remaining two 5 letter words
    // 5 is fully in 9
    // bcdef acdfg = bcdef
    5: "bcdef",
    // take all three 6 letter words
    // 6 is the only one that has 1 not in it
    // abcdef bcdefg abcdeg = bcdefg
    6: "bcdefg",
    7: "abd",
    8: "abcdefg",
    // take the remaining two 6 letter words
    // 9 is the only one that has 4 in it
    // abcdef abcdeg = abcdef
    9: "abcdef"
}; */

// 2 digits: 1
// 3 digits: 7
// 4 digits: 4
// 5 digits: 2, 3, 5
// 6 digits: 0, 6, 9
// 7 digits: 8

// Go in the following order:  1, 4, 7, 8, 6, 9, 0, 3, 5, 2

const findMatch = (
    possibilities: string[],
    contains: string
): string | undefined => {
    const result = possibilities.find((pos) =>
        contains.split("").every((c) => pos.includes(c))
    );

    possibilities.splice(possibilities.indexOf(result!), 1);
    return result;
};

const findNonMatch = (
    possibilities: string[],
    contains: string
): string | undefined => {
    const result = possibilities.find(
        (pos) => !contains.split("").every((c) => pos.includes(c))
    );

    possibilities.splice(possibilities.indexOf(result!), 1);
    return result;
};

const inputs = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map(createLine)
    .filter((x): x is ILine => x != null);

let sum = 0;

for (const input of inputs) {
    const charMap: string[] = [];
    charMap[1] = input.patterns[0];
    charMap[4] = input.patterns[2];
    charMap[7] = input.patterns[1];
    charMap[8] = input.patterns[9];

    const sixLetterWords = input.patterns.filter((x) => x.length === 6);
    charMap[6] = findNonMatch(sixLetterWords, charMap[1])!;
    charMap[9] = findMatch(sixLetterWords, charMap[4])!;
    charMap[0] = sixLetterWords[0];

    let fiveLetterWords = input.patterns.filter((x) => x.length === 5);
    charMap[3] = findMatch(fiveLetterWords, charMap[1])!;
    charMap[5] = findMatch([charMap[9]], fiveLetterWords[0])
        ? fiveLetterWords[0]
        : fiveLetterWords[1];
    charMap[2] = fiveLetterWords.find((x) => x !== charMap[5])!;

    sum += +input.output.reduce((acc, output) => {
        return acc + charMap.findIndex((x) => x === output);
    }, "");
}

export const result = sum;
