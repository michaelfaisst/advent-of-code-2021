import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map((row) => row.split("").map(Number));

const calculateRate = (inputs: number[][], highBit: boolean) => {
    let filteredInputs = inputs;

    for (let i = 0; i < input[0].length; i++) {
        const nthBits = filteredInputs.map((row) => row[i]);
        const moreOnes =
            nthBits.filter((x) => x === 1).length >= filteredInputs.length / 2;

        const filterBy = highBit ? (moreOnes ? 1 : 0) : moreOnes ? 0 : 1;
        filteredInputs = filteredInputs.filter((x) => x[i] === filterBy);

        if (filteredInputs.length === 1) {
            return filteredInputs[0].join("");
        }
    }
};

const oxygenRating = calculateRate([...input], true);
const co2Rating = calculateRate([...input], false);

console.log(oxygenRating, co2Rating);

export const result =
    parseInt(oxygenRating || "0", 2) * parseInt(co2Rating || "0", 2);
