import { assertEquals } from "jsr:@std/assert";

import { part1, part2, Report } from "./day-2.ts";

const TEST_INPUT = [
  [7, 6, 4, 2, 1],
  [1, 2, 7, 8, 9],
  [9, 7, 6, 2, 1],
  [1, 3, 2, 4, 5],
  [8, 6, 4, 4, 1],
  [1, 3, 6, 7, 9],
] satisfies Report[];

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 2);
});

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 4);
});
