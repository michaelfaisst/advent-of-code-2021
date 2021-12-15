import { readFileSync } from "fs";
import { join } from "path";

export interface IPoint {
    x: number;
    y: number;
}

export interface IInstruction {
    direction: "x" | "y";
    index: number;
}

export const readInput = () => {
    const input = readFileSync(join(__dirname, "input.txt"), "utf8").split(
        "\n\n"
    );

    const dots = input[0].split("\n").map((line) => {
        const [x, y] = line.split(",");
        return { x: Number(x), y: Number(y) } as IPoint;
    });

    const instructions = input[1].split("\n").map((line) => {
        const [direction, index] = line.split(" ")[2].split("=");
        return { direction, index: Number(index) } as IInstruction;
    });

    return { dots, instructions };
};

export const fold = (dots: IPoint[], instruction: IInstruction) => {
    return dots
        .map((point) => {
            const value = instruction.direction === "x" ? point.x : point.y;

            if (value <= instruction.index) {
                return point;
            }

            const delta = value - instruction.index;
            const newPoint = {
                x:
                    instruction.direction === "x"
                        ? instruction.index - delta
                        : point.x,
                y:
                    instruction.direction === "y"
                        ? instruction.index - delta
                        : point.y
            } as IPoint;

            return dots.find((p) => p.x === newPoint.x && p.y === newPoint.y)
                ? undefined
                : newPoint;
        })
        .filter((x): x is IPoint => x != null);
};
