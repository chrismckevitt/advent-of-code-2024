import { assertEquals } from "jsr:@std/assert";

import { getDiagonals } from "./get-diagonals.ts";

Deno.test("getDiagonals", () => {
  const grid1 = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ];
  assertEquals(getDiagonals(grid1), ["aei", "bf", "c", "dh", "g"]);

  const grid2 = [
    ["1", "2", "3", "4"],
    ["5", "6", "7", "8"],
  ];
  assertEquals(getDiagonals(grid2), ["16", "27", "38", "4", "5"]);

  const grid3 = [
    ["a", "b"],
    ["c", "d"],
    ["e", "f"],
    ["g", "h"],
  ];
  assertEquals(getDiagonals(grid3), ["ad", "b", "cf", "eh", "g"]);

  const grid4 = [
    ["x", "y", "z"],
  ];
  assertEquals(getDiagonals(grid4), ["x", "y", "z"]);

  const grid5 = [
    ["a"],
    ["b"],
    ["c"],
  ];
  assertEquals(getDiagonals(grid5), ["a", "b", "c"]);

  const grid6 = [
    ["hello"],
  ];
  assertEquals(getDiagonals(grid6), ["hello"]);

  const grid7 = [
    ["1", "2"],
    ["3", "4"],
  ];
  assertEquals(getDiagonals(grid7), ["14", "2", "3"]);

  const grid8 = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["9", "A", "B"],
  ];
  assertEquals(getDiagonals(grid8), ["048", "15", "2", "37B", "6A", "9"]);
});
