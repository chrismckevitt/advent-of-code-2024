type Orientation = typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT;
type Cell = typeof OBSTACLE | typeof MARK | typeof DOT | Orientation;

const OBSTACLE = "#";
const MARK = "X";
const DOT = ".";
const UP = "^";
const RIGHT = ">";
const DOWN = "v";
const LEFT = "<";
const CELLS = [OBSTACLE, DOT, MARK, UP, RIGHT, DOWN, LEFT];
const ORIENTATIONS = [UP, RIGHT, DOWN, LEFT];

const TEST_INPUT = `....#.....
.........#
..........
..#.......
.......#..
..........
.#..^.....
........#.
#.........
......#...`;

// Out of bounds
// [-1][n] || [n][-1]
//

export default function day6(_input: string) {
  console.log(`
    Day 6: \n
    - 🤮 Part 1: ${part1(TEST_INPUT)}\n
    `);
}

function part1(input: string): number {
  const grid = parseGrid(input);
  const indices = findGridIndices(grid, ORIENTATIONS);
  const [i, j] = indices;
  const start = grid[i][j];
  let visited = 0;
  console.log(
    `Starting orientation: ${start}, indices: ${JSON.stringify(indices)}`,
  );
  return 0;
}

function parseGrid(input: string): Cell[][] {
  const rows = input.split("\n");
  return rows.map(parseRow);
}

function parseRow(row: string): Cell[] {
  const cell = row.split("");
  return cell.map(parseCell);
}

function parseCell(cell: string): Cell {
  if (!isCell(cell)) {
    throw new Error(`parseCell: cell ${cell} is not of type Cell`);
  }
  return cell;
}

function findGridIndices(
  grid: Cell[][],
  cells: string[],
): [number, number] {
  const rowIndex = findRowIndex(grid, cells);
  const row = grid[rowIndex];
  const colIndex = findColIndex(row, cells);
  return [rowIndex, colIndex];
}

function findRowIndex(grid: Cell[][], cells: string[]): number {
  return grid.findIndex((row) => row.find((cell) => cells.includes(cell)));
}

function findColIndex(row: Cell[], cells: string[]): number {
  return row.findIndex((cell) => cells.includes(cell));
}

function getNextIndices(current: [number, number], orientation: Orientation): [number, number] {
  const [i, j] = current;
  switch (orientation) {
    case '^': return [i - 1, j];
    case '>': return [i, j + 1];
    case 'v': return [i + 1, j];
    case '<': return [i, j - 1];
  }
}

function isCell(cell: string): cell is Cell {
  return CELLS.includes(cell);
}

function isObstacle(cell: Cell) {
  return cell === OBSTACLE;
}

function isClear(cell: Cell) {
  return cell === DOT;
}

const clockwise: Record<Orientation, Orientation> = {
  [UP]: RIGHT,
  [RIGHT]: DOWN,
  [DOWN]: LEFT,
  [LEFT]: UP,
};

function rotateClockwise(current: Orientation): Orientation {
  return clockwise[current];
}
