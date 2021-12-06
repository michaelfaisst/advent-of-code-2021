import { readFileSync } from "fs";
import { join } from "path";
import { countTimers, initializeMap, simulateTime } from "./commons";

let timers = readFileSync(join(__dirname, "input.txt"), "utf-8")
    .split(",")
    .map(Number);

let timerMap = initializeMap(timers);
timerMap = simulateTime(timerMap, 80);

export const result = countTimers(timerMap);
