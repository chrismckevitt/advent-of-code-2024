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

export default function day6(input: string) {
  console.log(`
    Day 6: \n
    - 🤮 Part 1: ${part1(input)}\n
    `);
}

export function part1(input: string): number {
  const grid = parseGrid(input);
  const guard = new Guard(grid);

  while (guard.isInBounds) {
    guard.step();
  }

  return guard.visitedCount;
}

class Guard {
  #grid: Cell[][];
  #pos: Indices;
  #orientation: Orientation;
  isInBounds: boolean = true;

  constructor(grid: Cell[][]) {
    this.#grid = grid;
    this.#pos = findIndices(this.#grid, ORIENTATIONS);

    if (isOutOfBounds(this.#grid, this.#pos)) {
      throw new Error(
        `Starting position ${this.#pos} cannot be out of bounds.`,
      );
    }

    const [i, j] = this.#pos;
    const startCell = this.#grid[i][j];

    if (!isOrientation(startCell)) {
      throw new Error(`Start cell ${startCell} must be of type Orientation.`);
    }

    this.#orientation = startCell;
    this.#grid[i][j] = VISITED;
  }

  get visitedCount(): number {
    return countVisited(this.#grid);
  }

  step(): void {
    const nextPos = getIndices(this.#pos, this.#orientation);

    if (isOutOfBounds(this.#grid, nextPos)) {
      this.isInBounds = false;
      return;
    }

    const [l, k] = nextPos;
    const nextCell = this.#grid[l][k];

    if (isOrientation(nextCell)) {
      throw new Error("Next cell cannot be of type Orientation.");
    } else if (isObstacle(nextCell)) {
      this.#orientation = rotateClockwise(this.#orientation);
    } else {
      this.#pos = nextPos;
      this.#grid[l][k] = VISITED;
    }
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
  if (isCell(cell)) {
    return cell;
  } else {
    throw new Error(`parseCell: cell ${cell} is not of type Cell`);
  }
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
    default:
      throw new Error(`Unknown orientation ${orientation}.`);
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
  if (i < 0 || j < 0) return true;
  if (i >= grid.length || j >= grid[i].length) return true;
  return false;
}

function rotateClockwise(current: Orientation): Orientation {
  return clockwise[current];
}

function countVisited(grid: Cell[][]): number {
  let count = 0;
  for (const row of grid) {
    for (const cell of row) {
      if (isVisited(cell)) count++;
    }
  }
  return count;
}
