console.time("R1");
import { result as result1 } from "./solution1";
console.timeEnd("R1");

console.time("R2");
import { result as result2 } from "./solution2";
console.timeEnd("R2");

console.log("Result 1:", result1);
console.log("Result 2:", result2);
