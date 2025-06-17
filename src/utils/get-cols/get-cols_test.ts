import { assertEquals } from "jsr:@std/assert";

import { getCols } from "./get-cols.ts";

Deno.test("getCols", () => {
  const grid1 = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ];
  assertEquals(getCols(grid1), ["adg", "beh", "cfi"]);

  const grid2 = [
    ["1", "2", "3", "4"],
    ["5", "6", "7", "8"],
  ];
  assertEquals(getCols(grid2), ["15", "26", "37", "48"]);

  const grid3 = [
    ["x", "y", "z"],
  ];
  assertEquals(getCols(grid3), ["x", "y", "z"]);

  const grid4 = [
    ["a"],
    ["b"],
    ["c"],
  ];
  assertEquals(getCols(grid4), ["abc"]);

  const grid5 = [
    ["hello"],
  ];
  assertEquals(getCols(grid5), ["hello"]);

  const grid6 = [
    ["", "x", ""],
    ["y", "", "z"],
  ];
  assertEquals(getCols(grid6), ["y", "x", "z"]);
});
