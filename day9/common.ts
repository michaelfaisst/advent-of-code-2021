export interface IPosition {
    x: number;
    y: number;
}

export const getNeighbours = (pos: IPosition): IPosition[] => {
    return [
        { x: pos.x - 1, y: pos.y },
        { x: pos.x, y: pos.y + 1 },
        { x: pos.x + 1, y: pos.y },
        { x: pos.x, y: pos.y - 1 }
    ];
};

export const isLowPoint = (map: number[][], pos: IPosition): boolean => {
    return getNeighbours(pos).every(
        (neighbour) =>
            (map[neighbour.x]?.[neighbour.y] ?? Number.MAX_SAFE_INTEGER) >
            map[pos.x][pos.y]
    );
};
