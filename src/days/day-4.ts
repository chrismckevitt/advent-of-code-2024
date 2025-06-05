import { add } from "../utils/add/add.ts";
import { getDiagonals } from "../utils/getDiagonals/getDiagonals.ts";
import { XMAS_REGEX } from "../regexes/xmas.ts";
import { getCols } from "../utils/getCols/getCols.ts";

function part1(data: string) {
  const rows = data.trim()
    .split(/\n/);

  const grid = rows
    .map((row) => row.split(""));

  const diagonalsDown = getDiagonals(grid);
  const diagonalsUp = getDiagonals(grid.map((row) => [...row].reverse()));
  const cols = getCols(grid);

  return [
    rows,
    cols,
    diagonalsDown,
    diagonalsUp,
  ].flatMap((cases) =>
    cases.map((string) => [...string.matchAll(XMAS_REGEX)].length)
  )
    .reduce(add);
}

function day4(input: string) {
  console.log(`   
    Day 4: \n
    - 💒️ Part 1: ${part1(input)}\n
    `);
}

export default day4;
