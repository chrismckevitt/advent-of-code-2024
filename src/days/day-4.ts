import { add } from "../utils/add/add.ts";
import { getDiagonals } from "../utils/get-diagonals/get-diagonals.ts";
import { SAM_MAS_REGEX, XMAS_REGEX } from "../regexes/xmas.ts";
import { getCols } from "../utils/get-cols/get-cols.ts";
import { getGridSize } from "../utils/get-grid-size/get-grid-size.ts";
import { getGrid } from "../utils/get-grid/getGrid.ts";

const part1 = (data: string) =>
  (({ rows, grid }) => [
    rows,
    getCols(grid),
    getDiagonals(grid),
    getDiagonals(grid.map((row) => [...row].reverse())),
  ])(getGrid(data))
    .flatMap((cases): number[] =>
      cases.map((string) => [...string.matchAll(XMAS_REGEX)].length)
    )
    .reduce(add);

function part2(data: string) {
  const { grid } = getGrid(data);
  const { rowLength, colLength } = getGridSize(grid);

  let matchCount = 0;

  for (let i = 0; i < rowLength - 2; i++) {
    for (let j = 0; j < colLength - 2; j++) {
      const leftDown = `${grid[i][j]}${grid[i + 1][j + 1]}${
        grid[i + 2][j + 2]
      }`;
      const leftUp = `${grid[i + 2][j]}${grid[i + 1][j + 1]}${grid[i][j + 2]}`;

      if (
        [...leftDown.matchAll(SAM_MAS_REGEX)].length &&
        [...leftUp.matchAll(SAM_MAS_REGEX)].length
      ) {
        matchCount++;
      }
    }
  }

  return matchCount;
}

function day4(input: string) {
  console.log(`   
    Day 4: \n
    - 💒️ Part 1: ${part1(input)}\n
    - 💒️ Part 2: ${part2(input)}\n
    `);
}

export default day4;
