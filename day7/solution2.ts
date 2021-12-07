import { readFileSync } from "fs";
import { join } from "path";

interface IFuelMap {
    [position: number]: number;
}

const positions = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split(",")
    .map(Number);

const fuelMap: IFuelMap = {};
const maxPosition = Math.max(...positions);

for (let i = 0; i <= maxPosition; i++) {
    if (i in fuelMap) {
        continue;
    }

    const fuel = positions.reduce((acc, curr) => {
        const distance = Math.abs(curr - i);
        return acc + (distance * (distance + 1)) / 2;
    }, 0);

    fuelMap[i] = fuel;
}

export const result = Math.min(...Object.values(fuelMap));
