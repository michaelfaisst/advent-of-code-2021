export interface ICoordinate {
    x: number;
    y: number;
}

export interface ILine {
    start: ICoordinate;
    end: ICoordinate;
    delta: ICoordinate;
}

export interface IMap {
    [x: number]: {
        [y: number]: number;
    };
}

export const mapLine = (line: string): ILine | undefined => {
    const match = /(\d+),(\d+) -> (\d+),(\d+)/.exec(line);

    if (!match) {
        return;
    }

    const start = {
        x: +match[1],
        y: +match[2]
    };

    const end = {
        x: +match[3],
        y: +match[4]
    };

    return {
        start,
        end,
        delta: {
            x: start.x === end.x ? 0 : start.x < end.x ? 1 : -1,
            y: start.y === end.y ? 0 : start.y < end.y ? 1 : -1
        }
    };
};

export const markPosition = (map: IMap, pos: ICoordinate) => {
    if (!(pos.x in map)) {
        map[pos.x] = {};
    }

    if (!(pos.y in map[pos.x])) {
        map[pos.x][pos.y] = 0;
    }

    map[pos.x][pos.y]++;
};

export const traverseLine = (map: IMap, line: ILine) => {
    let pos = line.start;

    const steps =
        Math.max(
            Math.abs(line.end.x - line.start.x),
            Math.abs(line.end.y - line.start.y)
        ) + 1;

    for (let i = 0; i <= steps; i++) {
        markPosition(map, pos);

        pos.x += line.delta.x;
        pos.y += line.delta.y;
    }
};
