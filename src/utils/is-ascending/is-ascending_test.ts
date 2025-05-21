import { assertEquals } from "jsr:@std/assert";

import { isAscending } from "./is-ascending.ts";

Deno.test("isAscending", () => {
  const validCases = [
    [1, 2, 3, 4, 5],
    [1, 3, 5, 7],
    [1, 4, 7, 10],
    [42],
    [],
  ];

  const invalidCases = [
    [5, 4, 3, 2, 1],
    [1, 1, 2, 3],
    [1, 2, 2, 3],
    [1, 2, 3, 3],
    [1, 5, 8, 11],
    [1, 2, 6, 9],
    [1, 3, 5, 9],
  ];

  for (const testCase of validCases) {
    assertEquals(isAscending(testCase), true);
  }

  for (const testCase of invalidCases) {
    assertEquals(isAscending(testCase), false);
  }
});
