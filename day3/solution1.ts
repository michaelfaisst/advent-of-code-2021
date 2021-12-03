import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map((row) => row.split("").map(Number));

let gammaRate = "";
let epsilonRate = "";

for (let i = 0; i < input[0].length; i++) {
    const nthBits = input.map((row) => row[i]);
    const moreOnes = nthBits.filter((x) => x === 1).length > input.length / 2;

    gammaRate += moreOnes ? "1" : "0";
    epsilonRate += moreOnes ? "0" : "1";
}

export const result = parseInt(gammaRate, 2) * parseInt(epsilonRate, 2);
