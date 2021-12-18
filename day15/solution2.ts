import { calculateShortestPath, readMap } from "./commons";

const map = readMap();
const mapLength = map.length;
const mapHeight = map[0].length;

const repeats = 4;

for (let row = 0; row < map.length; row++) {
    for (let delta = 1; delta <= repeats; delta++) {
        map[row].push(
            ...map[row].slice(0, mapLength).map((c) => {
                return {
                    ...c,
                    risk:
                        c.risk + delta > 9
                            ? (c.risk + delta) % 9
                            : c.risk + delta
                };
            })
        );
    }
}

for (let delta = 1; delta <= repeats; delta++) {
    for (let row = 0; row < mapHeight; row++) {
        map.push([
            ...map[row].map((c) => {
                return {
                    ...c,
                    risk:
                        c.risk + delta > 9
                            ? (c.risk + delta) % 9
                            : c.risk + delta
                };
            })
        ]);
    }
}

for (let row = 0; row < map.length; row++) {
    for (let col = 0; col < map[0].length; col++) {
        map[row][col].row = row;
        map[row][col].col = col;
    }
}

const distance = calculateShortestPath(map);

export const result = distance;
