export function getCols(grid: string[][]) {
  const rows = grid.length;
  const cols = grid[0].length;
  const col: string[][] = [];

  for (let i = 0; i < cols; i++) {
    col[i] = [];
    for (let j = 0; j < rows; j++) {
      col[i].push(grid[j][i]);
    }
  }

  return col.map((row) => row.join(""));
}
