import { readTargetArea, simulateLaunch } from "./common";

const targetArea = readTargetArea();
let numberPaths = 0;

for (let xVel = 1; xVel <= targetArea.xMax; xVel++) {
    for (let yVel = targetArea.yMin; yVel <= 10000; yVel++) {
        const result = simulateLaunch({ x: xVel, y: yVel }, targetArea);

        if (result.success) {
            numberPaths++;
        }
    }
}

export const result = numberPaths;
