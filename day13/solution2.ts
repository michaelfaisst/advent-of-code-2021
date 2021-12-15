import { fold, readInput } from "./common";

let { dots, instructions } = readInput();

for (const instruction of instructions) {
    dots = fold(dots, instruction);
}

const maxY = Math.max(...dots.map((p) => p.y));

for (let i = 0; i <= maxY; i++) {
    let line = "";
    const points = dots.filter((x) => x.y === i);
    const maxX = Math.max(...points.map((x) => x.x));

    for (let j = 0; j <= maxX; j++) {
        line += points.find((p) => p.x === j) ? "#" : ".";
    }

    console.log(line);
}

export const result = dots.length;
