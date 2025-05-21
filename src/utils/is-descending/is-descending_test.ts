import { assertEquals } from "jsr:@std/assert";

import { isDescending } from "./is-descending.ts";

Deno.test("isDescending", () => {
  const validCases = [
    [5, 4, 3, 2, 1],
    [7, 5, 3, 1],
    [10, 7, 4, 1],
    [24],
    [],
  ];

  const invalidCases = [
    [1, 2, 3, 4, 5],
    [3, 2, 1, 1],
    [3, 2, 2, 1],
    [3, 3, 2, 1],
    [11, 8, 5, 1],
    [9, 6, 2, 1],
    [9, 5, 3, 1],
  ];

  for (const testCase of validCases) {
    assertEquals(isDescending(testCase), true);
  }

  for (const testCase of invalidCases) {
    assertEquals(isDescending(testCase), false);
  }
});
