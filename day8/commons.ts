export interface ILine {
    patterns: string[];
    output: string[];
}

export const createLine = (line: string) => {
    const match = /(.*) \| (.*)/.exec(line);

    if (!match) {
        return undefined;
    }

    return {
        patterns: match[1]
            .split(" ")
            .sort((a, b) => a.length - b.length)
            .map((x) => x.split("").sort().join("")),
        output: match[2].split(" ").map((x) => x.split("").sort().join(""))
    };
};
