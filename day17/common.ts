import { readFileSync } from "fs";
import { join } from "path";

export interface ITargetArea {
    xMin: number;
    xMax: number;
    yMin: number;
    yMax: number;
}

export interface IPos {
    x: number;
    y: number;
}

export const readTargetArea = () => {
    const input = readFileSync(join(__dirname, "input.txt"), "utf-8");
    const match = /x=(-?\d*)..(-?\d*).*y=(-?\d*)..(-?\d*)/.exec(input);

    if (!match) {
        throw new Error("couldnt parse match");
    }

    return {
        xMin: +match[1],
        xMax: +match[2],
        yMin: +match[3],
        yMax: +match[4]
    } as ITargetArea;
};

export const isInTargetArea = (pos: IPos, targetArea: ITargetArea) => {
    return (
        pos.x >= targetArea.xMin &&
        pos.x <= targetArea.xMax &&
        pos.y >= targetArea.yMin &&
        pos.y <= targetArea.yMax
    );
};

export const hasMissedTargetArea = (pos: IPos, targetArea: ITargetArea) => {
    return pos.x >= targetArea.xMax || pos.y < targetArea.yMin;
};

export const simulateLaunch = (velocity: IPos, targetArea: ITargetArea) => {
    const pos: IPos = { x: 0, y: 0 };
    let maxY = 0;

    while (
        !isInTargetArea(pos, targetArea) &&
        !hasMissedTargetArea(pos, targetArea)
    ) {
        pos.x += velocity.x;
        pos.y += velocity.y;
        velocity.x += velocity.x < 0 ? 1 : velocity.x > 0 ? -1 : 0;
        velocity.y--;

        if (pos.y > maxY) {
            maxY = pos.y;
        }
    }

    return isInTargetArea(pos, targetArea)
        ? { success: true, maxY }
        : { success: false };
};
