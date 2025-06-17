export function getGrid(input: string) {
  const rows = input.trim().split(/\n/);

  const grid = rows
    .map((row) => row.split(""));

  return { rows, grid };
}
