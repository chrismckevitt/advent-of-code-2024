type Orientation = typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT;
type Obstacle = typeof HASH;
type Visited = typeof X;
type Clear = typeof DOT;
type Cell = Obstacle | Visited | Clear | Orientation;

const HASH = "#";
const X = "X";
const DOT = ".";
const UP = "^";
const RIGHT = ">";
const DOWN = "v";
const LEFT = "<";
const CELLS = [HASH, DOT, X, UP, RIGHT, DOWN, LEFT];
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
  let grid: Cell[][] = [[]];

  try {
    grid = parseGrid(input)
  } catch {
    return -1
  };

  const startIndices = findIndices(grid, ORIENTATIONS);
  console.assert(isInBounds(grid, startIndices), `Start indices ${JSON.stringify(startIndices)} not in grid bounds.`);
  const [i, j] = startIndices;
  const startCell = grid[i][j];
  console.assert(isOrientation(startCell), `part1: start cell orientation ${startCell} is not of type Orientation.`);
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
  console.assert(isCell(cell), `parseCell: cell ${cell} is not of type Cell`);

  if (!isCell(cell)) {
    throw new Error(`parseCell: cell ${cell} is not of type Cell`);
  }

  return cell;
}

function findIndices(
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

function getNextIndices(
  current: [number, number],
  orientation: Orientation,
): [number, number] {
  const [i, j] = current;
  switch (orientation) {
    case "^":
      return [i - 1, j];
    case ">":
      return [i, j + 1];
    case "v":
      return [i + 1, j];
    case "<":
      return [i, j - 1];
  }
}

function isCell(cell: string): cell is Cell {
  return CELLS.includes(cell);
}

function isOrientation(cell: Cell): cell is Orientation {
  return ORIENTATIONS.includes(cell);
}

function isObstacle(cell: Cell): cell is Obstacle {
  return cell === HASH;
}

function isClear(cell: Cell): cell is Clear {
  return cell === DOT;
}

function isVisited(cell: Cell): cell is Visited {
  return cell === X;
}

function isInBounds(grid: Cell[][], indices: [number, number]) {
  const [i, j] = indices;
  if (i < 0) return false;
  if (j < 0) return false;
  if (i >= grid.length) return false;
  if (j >= grid[i].length) return false;
  return true;
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
