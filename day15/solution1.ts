import { calculateShortestPath, readMap } from "./commons";

const map = readMap();
const distance = calculateShortestPath(map);

export const result = distance;
