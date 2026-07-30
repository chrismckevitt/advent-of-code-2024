import { assertEquals } from "jsr:@std/assert";

import { type Data, part1, part2 } from "./day-1.ts";

const TEST_INPUT = [[
  3,
  4,
  2,
  1,
  3,
  3,
], [4, 3, 5, 3, 9, 3]] satisfies Data;

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUT), 11);
});

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUT), 31);
});
