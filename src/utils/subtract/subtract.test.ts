import { assertEquals } from "jsr:@std/assert";

import { subtract } from "./subtract.ts";

Deno.test("subtract", () => {
  for (let i = 0, j = i + 1; i < 10; i++, j++) {
    assertEquals(subtract(i, j), i - j);
  }
});
