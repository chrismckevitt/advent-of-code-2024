import { add } from "../../utils/add/add.ts";
import { multiply } from "../../utils/multiply/multiply.ts";
import { subtract } from "../../utils/subtract/subtract.ts";
import { MULTIPLY_REGEX } from "../../regexes/multiply.ts";
import { ENABLE_REGEX } from "../../regexes/enable.ts";
import { DISABLE_REGEX } from "../../regexes/disable.ts";

interface Toggle {
  index: number;
  enabled: boolean;
}
const parseOperation = (operation: string): [number, number] => [
  Number.parseInt(
    operation.slice(
      operation.indexOf("(") + 1,
      operation.indexOf(","),
    ),
    10,
  ),
  Number.parseInt(
    operation.slice(
      operation.indexOf(",") + 1,
      operation.indexOf(")"),
    ),
    10,
  ),
];

export const part1 = (data: string): number =>
  data.match(MULTIPLY_REGEX)?.map((
    operation,
  ) => parseOperation(operation)).flatMap((operands) =>
    operands.reduce(multiply)
  )
    .reduce(add) ?? 0;

export const part2 = (data: string): number => {
  const operands: [number, number][] = [];
  let enabled = true;
  let startIndex = 0;

  for (const operationMatches of data.matchAll(MULTIPLY_REGEX)) {
    const toggleSearch = data.slice(startIndex, operationMatches.index);
    const toggles: Toggle[] = [];

    for (const enableMatches of toggleSearch.matchAll(ENABLE_REGEX)) {
      if (enabled) {
        continue;
      }

      toggles.push({
        index: startIndex + (enableMatches.index ?? 0),
        enabled: true,
      });
    }

    for (const disableMatches of toggleSearch.matchAll(DISABLE_REGEX)) {
      toggles.push({
        index: startIndex + (disableMatches.index),
        enabled: false,
      });
    }

    toggles.sort((a, b) => subtract(a.index, b.index));

    for (const toggle of toggles) {
      enabled = toggle.enabled;
    }

    if (enabled) {
      operands.push(parseOperation(operationMatches[0]));
    }

    startIndex = operationMatches.index + operationMatches[0].length;
  }

  return operands.flatMap((operands) => operands.reduce(multiply))
    .reduce(add);
};

export function day3(input: string): void {
  console.log(`
    Day 3: \n
    - 🎆️ Part 1: ${part1(input)}\n
    - 🎇 Part 2: ${part2(input)}\n
    `);
}

export default day3;
