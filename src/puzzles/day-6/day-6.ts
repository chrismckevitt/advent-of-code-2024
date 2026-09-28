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

const clockwise: Record<Orientation, Orientation> = {
  [UP]: RIGHT,
  [RIGHT]: DOWN,
  [DOWN]: LEFT,
  [LEFT]: UP,
};

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

export default function day6(_input: string) {
  console.log(`
    Day 6: \n
    - 🤮 Part 1: ${part1(TEST_INPUT)}\n
    `);
}

function part1(input: string): number {
  const grid = parseGrid(input);
  const guard = new Guard(grid);

  while (guard.isInBounds) {
    guard.step();
  }

  return guard.countVisited();
}

class Guard {
  #grid: Cell[][];
  #currentPos: Indices;
  #currentOrientation: Orientation;
  isInBounds: boolean = true;

  constructor(grid: Cell[][]) {
    this.#grid = grid;
    this.#currentPos = findIndices(this.#grid, ORIENTATIONS);

    if (isOutOfBounds(this.#grid, this.#currentPos)) {
      throw new Error(
        `Starting position ${this.#currentPos} cannot be out of bounds.`,
      );
    }

    const [i, j] = this.#currentPos;
    const startCell = this.#grid[i][j];

    if (!isOrientation(startCell)) {
      throw new Error(`Start cell ${startCell} must be of type Orientation.`);
    }

    this.#currentOrientation = startCell;
    this.#grid[i][j] = VISITED;
  }

  step(): void {
    const nextPos = getIndices(this.#currentPos, this.#currentOrientation);

    if (isOutOfBounds(this.#grid, nextPos)) {
      this.isInBounds = false;
      return;
    }

    const [l, k] = nextPos;
    const nextCell = this.#grid[l][k];

    if (isOrientation(nextCell)) {
      throw new Error("Next cell cannot be of type Orientation.");
    } else if (isObstacle(nextCell)) {
      this.#currentOrientation = rotateClockwise(this.#currentOrientation);
    } else {
      this.#currentPos = nextPos;
      this.#grid[l][k] = VISITED;
    }
  }

  countVisited(): number {
    let count = 0;
    for (const row of this.#grid) {
      for (const cell of row) {
        if (isVisited(cell)) count++;
      }
    }
    return count;
  }
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

function getIndices(
  current: Indices,
  orientation: Orientation,
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
function isVisited(cell: Cell): cell is Visited {
  return cell === VISITED;
}

function isOutOfBounds(grid: Cell[][], indices: Indices) {
  const [i, j] = indices;
  if (i < 0) return true;
  if (j < 0) return true;
  if (i >= grid.length) return true;
  if (j >= grid[i].length) return true;
  return false;
}

function rotateClockwise(current: Orientation): Orientation {
  return clockwise[current];
}
