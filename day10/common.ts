export interface IMap {
    [key: string]: number;
}

export const openingCharacters = ["(", "[", "{", "<"];
export const closingCharacters = [")", "]", "}", ">"];

export const isPairMatching = (opening: string, closing: string) => {
    const index = openingCharacters.indexOf(opening);
    return closing === closingCharacters[index];
};
