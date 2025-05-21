import { assertEquals } from "jsr:@std/assert";

import { isWithinTolerance } from "./is-within-tolerance.ts";

Deno.test("isWithinTolerance", () => {
  for (
    let i = 3, j = i - 1, k = j - 1, l = k - 1;
    i < 13;
    i++, j++, k++, l++
  ) {
    assertEquals(isWithinTolerance(i, j), true);
    assertEquals(isWithinTolerance(i, k), true);
    assertEquals(isWithinTolerance(i, l), true);
    assertEquals(isWithinTolerance(j, i), false);
    assertEquals(isWithinTolerance(k, i), false);
    assertEquals(isWithinTolerance(l, i), false);
  }
});
