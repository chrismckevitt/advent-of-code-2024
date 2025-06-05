export function getDiagonals(grid: string[][]) {
  const rows = grid.length;
  const cols = grid[0].length;
  const allDiagonals: [string[][], string[][]] = [[],[]];

  /*
   * Right + down
   */

  // Top row
  for (let start = 0; start < cols; start++) {
    allDiagonals[0][start] = [];
    for (let i = 0; i + start < cols && i < rows; i++) {
      allDiagonals[0][start].push(grid[i][i + start]);
    }
  }

  // Left col, row offset by 1
  for (let start = 1; start < rows; start++) {
    allDiagonals[1][start - 1] = [];
    for (let i = 0; i + start < rows && i < cols; i++) {
      allDiagonals[1][start - 1].push(grid[start + i][i]);
    }
  }

  return allDiagonals.flatMap((diagonals) =>
    diagonals.map((diagonal) => diagonal.join(""))
  );
}
