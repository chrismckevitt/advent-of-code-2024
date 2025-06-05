import { add } from "../utils/add/add.ts";
import { multiply } from "../utils/multiply/multiply.ts";
import { subtract } from "../utils/subtract/subtract.ts";
import { parseOperation } from "../utils/parse-operation/parse-operation.ts";
import { Toggle } from "../types/toggle.ts";
import { Operands } from "../types/operands.ts";
import { MULTIPLY_REGEX } from "../regexes/multiply.ts";
import { ENABLE_REGEX } from "../regexes/enable.ts";
import { DISABLE_REGEX } from "../regexes/disable.ts";

const part1 = (data: string): number =>
  data.match(MULTIPLY_REGEX)?.map((
    operation,
  ) => parseOperation(operation)).flatMap((operands) =>
    operands.reduce(multiply)
  )
    .reduce(add) ?? 0;

function part2(data: string) {
  const operands: Operands[] = [];
  let enabled = true;
  let startIndex = 0;

  let operationMatches: RegExpMatchArray | null;
  while (
    (operationMatches = MULTIPLY_REGEX.exec(data)) !== null
  ) {
    const toggleSearch = data.slice(startIndex, operationMatches.index);
    const toggles: Toggle[] = [];

    let enableMatches: RegExpMatchArray | null;
    while ((enableMatches = ENABLE_REGEX.exec(toggleSearch)) !== null) {
      if (enabled) {
        continue;
      }

      toggles.push({
        index: data.indexOf(toggleSearch) +
          (enableMatches?.index ?? 0),
        enabled: true,
      });
    }

    let disableMatches: RegExpMatchArray | null;
    while ((disableMatches = DISABLE_REGEX.exec(toggleSearch)) !== null) {
      toggles.push({
        index: data.indexOf(toggleSearch) +
          (disableMatches?.index ?? 0),
        enabled: false,
      });
    }

    toggles.sort((a, b) => subtract(a.index ?? 0, b.index ?? 0));

    for (const toggle of toggles) {
      enabled = toggle.enabled;
    }

    if (enabled) {
      operands.push(parseOperation(operationMatches[0]));
    }

    startIndex = MULTIPLY_REGEX.lastIndex;
  }

  return operands.flatMap((operands) => operands.reduce(multiply))
    .reduce(add);
}

function day3(input: string) {
  console.log(`   
    Day 3: \n
    - 🎆️ Part 1: ${part1(input)}\n
    - 🎇 Part 2: ${part2(input)}\n
    `);
}

export default day3;
