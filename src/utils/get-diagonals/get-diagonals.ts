import { getGridSize } from "../get-grid-size/get-grid-size.ts";

export function getDiagonals(grid: string[][]) {
  const { rowLength, colLength } = getGridSize(grid);
  const allDiagonals: [string[][], string[][]] = [[], []];

  /*
   * Right + down
   */

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
