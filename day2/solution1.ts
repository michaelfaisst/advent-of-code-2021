import { readFileSync } from "fs";
import { join } from "path";

interface IPosition {
    x: number;
    depth: number;
}

enum Command {
    Forward = "forward",
    Up = "up",
    Down = "down"
}

interface ICommand {
    command: Command;
    value: number;
}

const parseInputRow = (row: string): ICommand | undefined => {
    const match = /(forward|up|down) (\d+)/.exec(row);

    if (!match) {
        return undefined;
    }

    return {
        command: match[1],
        value: +match[2]
    } as ICommand;
};

const execute = (command: ICommand): void => {
    switch (command.command) {
        case Command.Forward:
            position.x += command.value;
            break;
        case Command.Down:
            position.depth += command.value;
            break;
        case Command.Up:
            position.depth -= command.value;
            break;
    }
};

const position: IPosition = { x: 0, depth: 0 };
const commands = readFileSync(join(__dirname, "input.txt"), "utf8")
    .split("\n")
    .map(parseInputRow);

commands.forEach((command) => command && execute(command));

export const result = position.x * position.depth;
