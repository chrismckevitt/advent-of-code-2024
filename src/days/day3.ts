import { add } from "../utils/add.util.ts";
import { multiply } from "../utils/multiply.util.ts";
import { order } from "../utils/order.util.ts";
import { parseOperation } from "../utils/parseOperation.util.ts";
import { Toggle } from "../types/toggle.type.ts";
import { Operands } from "../types/operands.type.ts";
import { OPERATION_REGEX } from "../regex/operation.regex.ts";
import { ENABLE_REGEX } from "../regex/enable.regex.ts";
import { DISABLE_REGEX } from "../regex/disable.regex.ts";

const part1 = (data: string): number =>
    data.match(OPERATION_REGEX)?.map((
        operation,
    ) => parseOperation(operation)).flatMap((operands) =>
        operands.reduce(multiply)
    )
        .reduce(add) ?? 0;

const part2 = (data: string) => {
    const operands: Operands[] = [];
    let enabled = true;
    let startIndex = 0;

    let expressionMatches: RegExpMatchArray | null;
    while ((expressionMatches = OPERATION_REGEX.exec(data)) !== null) {
        const slice = data.slice(startIndex, expressionMatches.index);
        const toggles: Toggle[] = [];

        let enableMatches: RegExpMatchArray | null;
        while ((enableMatches = ENABLE_REGEX.exec(slice)) !== null) {
            toggles.push({
                index: data.indexOf(slice) +
                    (enableMatches?.index ?? 0),
                enabled: true,
            });
        }

        let disableMatches: RegExpMatchArray | null;
        while ((disableMatches = DISABLE_REGEX.exec(slice)) !== null) {
            toggles.push({
                index: data.indexOf(slice) +
                    (disableMatches?.index ?? 0),
                enabled: false,
            });
        }

        toggles.sort((a, b) => order(a.index ?? 0, b.index ?? 0));

        for (const toggle of toggles) {
            enabled = toggle.enabled;
        }

        if (enabled) {
            operands.push(parseOperation(expressionMatches[0]));
        }

        startIndex = OPERATION_REGEX.lastIndex;
    }

    return operands.flatMap((operands) => operands.reduce(multiply))
        .reduce(add);
};

function day3(input: string) {
    console.log(`   
    Day 3: \n
    - 🎆️ Part 1: ${part1(input)}\n
    - 🎇 Part 2: ${part2(input)}\n
    `);
}

export default day3;
