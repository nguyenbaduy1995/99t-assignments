/*
  We have 3 ways to calculate the sum from 1 to n:
  1. Formula: n * (n + 1) / 2
  2. Loop
  3. Recursion
*/

// Formula: n * (n + 1) / 2.
// O(1) time complexity & O(1) space complexity
const sum_to_n_a = (n: number): number => {
  if (n <= 0) return 0;
  return (n * (n + 1)) / 2;
};

// Loop
// O(n) time complexity & O(1) space complexity
const sum_to_n_b = (n: number): number => {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
};

// Recursion
// O(n) time complexity & O(n) space complexity
const sum_to_n_c = (n: number): number => {
  if (n <= 0) return 0;
  return n + sum_to_n_c(n - 1);
};

export { sum_to_n_a, sum_to_n_b, sum_to_n_c };
