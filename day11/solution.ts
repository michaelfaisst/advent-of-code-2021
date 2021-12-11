import { readFileSync } from "fs";
import { join } from "path";

let flashes = 0;
let allFlashed = -1;

interface IPosition {
    x: number;
    y: number;
}

const getNeighbours = (pos: IPosition): IPosition[] => {
    return [
        { x: pos.x - 1, y: pos.y - 1 },
        { x: pos.x - 1, y: pos.y },
        { x: pos.x - 1, y: pos.y + 1 },
        { x: pos.x, y: pos.y - 1 },
        { x: pos.x, y: pos.y + 1 },
        { x: pos.x + 1, y: pos.y - 1 },
        { x: pos.x + 1, y: pos.y },
        { x: pos.x + 1, y: pos.y + 1 }
    ];
};

const increaseEnergy = (octopuses: number[][]) => {
    for (let row = 0; row < octopuses.length; row++) {
        for (let col = 0; col < octopuses[row].length; col++) {
            octopuses[row][col]++;
        }
    }
};

const resetEnergy = (octopuses: number[][]) => {
    for (let row = 0; row < octopuses.length; row++) {
        for (let col = 0; col < octopuses[row].length; col++) {
            if (octopuses[row][col] > 9) {
                octopuses[row][col] = 0;
            }
        }
    }
};

const getFlashingOctopuses = (octopuses: number[][]) => {
    const flashing: IPosition[] = [];

    for (let row = 0; row < octopuses.length; row++) {
        for (let col = 0; col < octopuses[row].length; col++) {
            if (octopuses[row][col] > 9) {
                flashing.push({ x: row, y: col });
            }
        }
    }

    return flashing;
};

const flash = (octopuses: number[][], pos: IPosition, flashed: IPosition[]) => {
    if (flashed.find((p) => p.x === pos.x && p.y === pos.y)) {
        return;
    }

    flashes++;
    flashed.push(pos);

    getNeighbours(pos).forEach((neighbour) => {
        if (octopuses[neighbour.x]?.[neighbour.y] != null) {
            octopuses[neighbour.x][neighbour.y]++;

            if (octopuses[neighbour.x][neighbour.y] > 9) {
                flash(octopuses, neighbour, flashed);
            }
        }
    });
};

const simulateDay = (octopuses: number[][], day: number) => {
    increaseEnergy(octopuses);
    const flashing = getFlashingOctopuses(octopuses);
    const flashed: IPosition[] = [];

    flashing.forEach((flashingOctopus) =>
        flash(octopuses, flashingOctopus, flashed)
    );

    if (flashed.length === 100 && allFlashed === -1) {
        allFlashed = day;
    }

    resetEnergy(octopuses);
};

let octopuses = readFileSync(join(__dirname, "input.txt"), "utf-8")
    .split("\n")
    .map((line) => line.split("").map(Number));

// solution 1 calculation
for (let day = 1; day <= 100; day++) {
    simulateDay(octopuses, day);
}

const result1 = flashes;

let day = 100;
while (allFlashed === -1) {
    day++;
    simulateDay(octopuses, day);
}

export { result1, day as result2 };
