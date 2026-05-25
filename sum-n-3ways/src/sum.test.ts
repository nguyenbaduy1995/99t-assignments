import { describe, it, expect } from "vitest";
import { sum_to_n_a, sum_to_n_b, sum_to_n_c } from "./sum";

const implementations = [
  { name: "sum_to_n_a (formula)", fn: sum_to_n_a },
  { name: "sum_to_n_b (loop)", fn: sum_to_n_b },
  { name: "sum_to_n_c (recursion)", fn: sum_to_n_c },
];

describe.each(implementations)("$name", ({ fn }) => {
  it("returns 0 for n = 0", () => {
    expect(fn(0)).toBe(0);
  });

  it("returns 1 for n = 1", () => {
    expect(fn(1)).toBe(1);
  });

  it("returns 55 for n = 10", () => {
    expect(fn(10)).toBe(55);
  });

  it("returns 5050 for n = 100", () => {
    expect(fn(100)).toBe(5050);
  });

  it("handles negative numbers by returning 0", () => {
    expect(fn(-5)).toBe(0);
  });
});

describe("large n = 10^6", () => {
  const expected = 500000500000;

  it("sum_to_n_a (formula) handles n = 10^6", () => {
    expect(sum_to_n_a(1_000_000)).toBe(expected);
  });

  it("sum_to_n_b (loop) handles n = 10^6", () => {
    expect(sum_to_n_b(1_000_000)).toBe(expected);
  });

  // sum_to_n_c (recursion) skipped - stack overflow for large n
});
