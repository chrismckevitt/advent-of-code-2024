import { assertEquals } from "jsr:@std/assert";

import { getGridSize } from "./get-grid-size.ts";

Deno.test("getGridSize", () => {
  const grid1 = [
    ["a", "b", "c"],
    ["d", "e", "f"],
    ["g", "h", "i"],
  ];
  assertEquals(getGridSize(grid1), { rowLength: 3, colLength: 3 });

  const grid2 = [
    ["1", "2", "3", "4"],
    ["5", "6", "7", "8"],
  ];
  assertEquals(getGridSize(grid2), { rowLength: 2, colLength: 4 });

  const grid3 = [
    ["x", "y"],
    ["a", "b"],
    ["c", "d"],
    ["e", "f"],
  ];
  assertEquals(getGridSize(grid3), { rowLength: 4, colLength: 2 });

  const grid4 = [
    ["hello", "world", "test"],
  ];
  assertEquals(getGridSize(grid4), { rowLength: 1, colLength: 3 });

  const grid5 = [
    ["a"],
    ["b"],
    ["c"],
  ];
  assertEquals(getGridSize(grid5), { rowLength: 3, colLength: 1 });

  const grid6 = [
    ["x"],
  ];
  assertEquals(getGridSize(grid6), { rowLength: 1, colLength: 1 });

  const grid7 = [
    ["", "x", ""],
    ["y", "", "z"],
  ];
  assertEquals(getGridSize(grid7), { rowLength: 2, colLength: 3 });
});
