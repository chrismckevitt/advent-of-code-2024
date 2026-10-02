import { assertEquals } from "jsr:@std/assert";

import { part1, part2 } from "./day-4.ts";

const TEST_INPUT = `MMMSXXMASM
MSAMXMSMSA
AMXSXMAAMM
MSAMASMSMX
XMASAMXAMM
XXAMMXXAMA
SMSMSASXSS
SAXAMASAAA
MAMMMXMMMM
MXMXAXMASX`;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 18);
});

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 9);
});
