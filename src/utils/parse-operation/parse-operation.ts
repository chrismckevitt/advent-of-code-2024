export const parseOperation = (operation: string): [number, number] => [
  Number.parseInt(
    operation.slice(
      operation.indexOf("(") + 1,
      operation.indexOf(","),
    ),
  ),
  Number.parseInt(
    operation.slice(
      operation.indexOf(",") + 1,
      operation.indexOf(")"),
    ),
  ),
];
