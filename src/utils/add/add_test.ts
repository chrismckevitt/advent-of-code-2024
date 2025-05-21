import { assertEquals } from "jsr:@std/assert";

import { add } from "./add.ts";

Deno.test("add", () => {
  for (let i = 0, j = i + 1; i < 10; i++, j++) {
    assertEquals(add(i, j), i + j);
  }
});
