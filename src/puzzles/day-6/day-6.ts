type Orientation = typeof UP | typeof RIGHT | typeof DOWN | typeof LEFT;
type Obstacle = typeof OBSTACLE;
type Visited = typeof VISITED;
type Clear = typeof CLEAR;
type Cell = Obstacle | Visited | Clear | Orientation;
type Indices = [number, number];

const OBSTACLE = "#";
const VISITED = "X";
const CLEAR = ".";
const UP = "^";
const RIGHT = ">";
const DOWN = "v";
const LEFT = "<";
const CELLS = [OBSTACLE, CLEAR, VISITED, UP, RIGHT, DOWN, LEFT];
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
  const grid = parseGrid(input)
  const startIndices = findIndices(grid, ORIENTATIONS);
  const [i, j] = startIndices;
  const startCell = grid[i][j];
  if (!isOrientation(startCell)) {
    throw new Error(`startCell ${startCell} is not type Orientation.`)
  }

  const nextIndices = getNextIndicesFor(startCell, startIndices);
  const nextCell = grid[i][j];
  switch (nextCell) {
    case CLEAR: {
      // Mark prev
    }
    case OBSTACLE: {}
    case VISITED: { }
    default: throw new Error(`Cannot have multiple orientations in grid. Found ${startCell} at ${startIndices} and ${nextCell} at ${nextIndices}`);
  }

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

function findIndices(
  grid: Cell[][],
  cells: string[],
): Indices {
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

function getNextIndicesFor(
  orientation: Orientation,
  current: Indices,
): Indices {
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
  return cell === OBSTACLE;
}

function isClear(cell: Cell): cell is Clear {
  return cell === CLEAR;
}

function isVisited(cell: Cell): cell is Visited {
  return cell === VISITED;
}

function isInBounds(grid: Cell[][], indices: Indices) {
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
