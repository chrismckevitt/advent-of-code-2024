import { getGridSize } from "../get-grid-size/get-grid-size.ts";

export function getCols(grid: string[][]) {
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
