import { assertEquals } from "jsr:@std/assert";

import { multiply } from "./multiply.ts";

Deno.test("multiply", () => {
  for (let i = 0, j = i + 1; i < 10; i++, j++) {
    assertEquals(multiply(i, j), i * j);
  }
});
