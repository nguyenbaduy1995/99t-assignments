import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./sum";

const n = 100;

console.log(`Sum from 1 to ${n}:`);
console.log(`  Formula (sum_to_n_a): ${sum_to_n_a(n)}`);
console.log(`  Loop (sum_to_n_b):    ${sum_to_n_b(n)}`);
console.log(`  Recursion (sum_to_n_c): ${sum_to_n_c(n)}`);
