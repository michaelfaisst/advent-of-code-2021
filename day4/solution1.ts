import { readFileSync } from "fs";
import { join } from "path";

const input = readFileSync(join(__dirname, "input.txt"), "utf-8").split("\n\n");

interface IBoardCell {
    value: number;
    marked: boolean;
}

interface IBoardValueMap {
    [key: number]: {
        row: number;
        col: number;
    };
}

const createBoardValueMap = (boards: IBoardCell[][][]) => {
    const maps: IBoardValueMap[] = [];

    for (let board of boards) {
        const boardValueMap: IBoardValueMap = {};

        for (let row = 0; row < board.length; row++) {
            for (let col = 0; col < board[row].length; col++) {
                boardValueMap[board[row][col].value] = {
                    row,
                    col
                };
            }
        }

        maps.push(boardValueMap);
    }

    return maps;
};

const hasBingo = (board: IBoardCell[][]) => {
    const columns: IBoardCell[][] = [];
    for (let i = 0; i < board.length; i++) {
        columns.push(board.map((row, col) => board[col][i]));
    }

    return [...board, ...columns].some((arr) =>
        arr.every((cell) => cell.marked)
    );
};

const makeMove = (drawnNumber: number, boards: IBoardCell[][][]) => {
    for (let i = 0; i < boards.length; i++) {
        const board = boards[i];
        const pos = boardsValueMap[i][drawnNumber];

        if (pos) {
            board[pos.row][pos.col].marked = true;
        }

        if (hasBingo(board)) {
            return board;
        }
    }
};

const drawnNumbers = input[0].split(",").map(Number);
const boards = input.slice(1).map((board) =>
    board.split("\n").map((line) =>
        line
            .trim()
            .split(/\s+/)
            .map(
                (value) =>
                    ({
                        value: +value,
                        marked: false
                    } as IBoardCell)
            )
    )
);

const boardsValueMap = createBoardValueMap(boards);
let winningBoard: IBoardCell[][] | undefined = undefined;
let winningNumber: number | undefined = undefined;

for (let drawnNumber of drawnNumbers) {
    winningBoard = makeMove(drawnNumber, boards);

    if (winningBoard) {
        winningNumber = drawnNumber;
        break;
    }
}

let result = -1;

if (winningBoard && winningNumber) {
    result =
        winningBoard
            .flatMap((x) => x)
            .filter((x) => !x.marked)
            .reduce((acc, cell) => {
                return acc + cell.value;
            }, 0) * winningNumber;
}

export { result };
