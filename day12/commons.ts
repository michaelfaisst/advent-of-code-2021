export interface ICaves {
    [name: string]: ICave;
}

export interface ICave {
    name: string;
    big: boolean;
    connections: string[];
}

export const createCave = (name: string, caves: ICaves) => {
    if (!caves[name]) {
        caves[name] = {
            name,
            connections: [],
            big: name.charAt(0) >= "A" && name.charAt(0) <= "Z"
        };
    }
};

export const parseInput = (lines: string[], caves: ICaves) => {
    for (let line of lines) {
        const [start, end] = line.split("-");

        createCave(start, caves);
        createCave(end, caves);
        caves[start].connections.push(end);
        caves[end].connections.push(start);
    }
};
