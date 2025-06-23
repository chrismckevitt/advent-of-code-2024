import { add } from "../utils/add/add.ts";
import { SAM_MAS_REGEX, XMAS_REGEX } from "../regexes/xmas.ts";

const getGridSize = (grid: string[][]) => ({
  rowLength: grid.length,
  colLength: grid[0].length,
});

function getGrid(input: string) {
  const rows = input.trim().split(/\n/);

  const grid = rows
    .map((row) => row.split(""));

  return { rows, grid };
}

function getCols(grid: string[][]) {
  const { rowLength, colLength } = getGridSize(grid);
  const col: string[][] = [];

  for (let i = 0; i < colLength; i++) {
    col[i] = [];
    for (let j = 0; j < rowLength; j++) {
      col[i].push(grid[j][i]);
    }
  }

  return col.map((row) => row.join(""));
}

function getDiagonals(grid: string[][]) {
  const { rowLength, colLength } = getGridSize(grid);
  const allDiagonals: [string[][], string[][]] = [[], []];

  // Top row
  for (let start = 0; start < colLength; start++) {
    allDiagonals[0][start] = [];
    for (let i = 0; i + start < colLength && i < rowLength; i++) {
      allDiagonals[0][start].push(grid[i][i + start]);
    }
  }

  // Left col, row offset by 1
  for (let start = 1; start < rowLength; start++) {
    allDiagonals[1][start - 1] = [];
    for (let i = 0; i + start < rowLength && i < colLength; i++) {
      allDiagonals[1][start - 1].push(grid[start + i][i]);
    }
  }

  return allDiagonals.flatMap((diagonals) =>
    diagonals.map((diagonal) => diagonal.join(""))
  );
}

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
