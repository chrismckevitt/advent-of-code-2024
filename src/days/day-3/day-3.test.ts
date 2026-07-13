import { assertEquals } from "jsr:@std/assert";

import { part1, part2 } from "./day-3.ts";

const TEST_INPUTS = {
  part1:
    `xmul(2,4)%&mul[3,7]!@^do_not_mul(5,5)+mul(32,64]then(mul(11,8)mul(8,5))`,
  part2:
    `xmul(2,4)&mul[3,7]!^don't()_mul(5,5)+mul(32,64](mul(11,8)undo()?mul(8,5))`,
};

Deno.test("part1", () => {
  assertEquals(part1(TEST_INPUTS.part1), 161);
});

Deno.test("part2", () => {
  assertEquals(part2(TEST_INPUTS.part2), 48);
});
