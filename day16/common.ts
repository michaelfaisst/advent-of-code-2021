import { readFileSync } from "fs";
import { join } from "path";

export const getBinary = () => {
    const hex = readFileSync(join(__dirname, "input.txt"), "utf-8");

    return hex
        .split("")
        .map((char) => parseInt(char, 16).toString(2).padStart(4, "0"))
        .join("");
};
