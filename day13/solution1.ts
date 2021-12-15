import { fold, readInput } from "./common";

let { dots, instructions } = readInput();

for (const instruction of instructions) {
    dots = fold(dots, instruction);
}

export const result = dots.length;
