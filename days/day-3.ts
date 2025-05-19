import { add } from "../utils/add.ts";
import { multiply } from "../utils/multiply.ts";
import { order } from "../utils/order.ts";

type Mul = [number, number];

const MUL_REGEX = /mul\(\d{1,3},\d{1,3}\)/g;

const parseMul = (mulStr: string): Mul => [
    Number.parseInt(
        mulStr.slice(
            mulStr.indexOf("(") + 1,
            mulStr.indexOf(","),
        ),
    ),
    Number.parseInt(
        mulStr.slice(
            mulStr.indexOf(",") + 1,
            mulStr.indexOf(")"),
        ),
    ),
];

const part1 = (data: string): number =>
    data.match(MUL_REGEX)?.map((
        mulStr,
    ) => parseMul(mulStr)).flatMap((parsedMul) => parsedMul.reduce(multiply))
        .reduce(add) ?? 0;

interface Toggle {
    index: number | undefined;
    enabled: boolean;
}

const part2 = (data: string) => {
    const DO_REGEX = /do\(\)/g;
    const DO_NOT_REGEX = /don't\(\)/g;
    const muls: Mul[] = [];
    let enabled = true;
    let startIndex = 0;

    let mulMatchArray: RegExpMatchArray | null;
    while ((mulMatchArray = MUL_REGEX.exec(data)) !== null) {
        const slice = data.slice(startIndex, mulMatchArray.index);
        const toggles: Toggle[] = [];

        let enabledMatchArray: RegExpMatchArray | null;
        while ((enabledMatchArray = DO_REGEX.exec(slice)) !== null) {
            toggles.push({
                index: data.indexOf(slice) +
                    (enabledMatchArray?.index ?? 0),
                enabled: true,
            });
        }

        let disabledMatchArray: RegExpMatchArray | null;
        while ((disabledMatchArray = DO_NOT_REGEX.exec(slice)) !== null) {
            toggles.push({
                index: data.indexOf(slice) +
                    (disabledMatchArray?.index ?? 0),
                enabled: false,
            });
        }

        toggles.sort((a, b) => order(a.index ?? 0, b.index ?? 0));

        for (const toggle of toggles) {
            enabled = toggle.enabled;
        }

        if (enabled) {
            const mul = parseMul(mulMatchArray[0]);
            muls.push(mul);
        }

        startIndex = MUL_REGEX.lastIndex;
    }

    return muls.flatMap((parsedMul) =>
        parsedMul.reduce((a, b) => multiply(a, b))
    )
        .reduce(add);
};

async function day3() {
    const input = await Deno.readTextFile(
        new URL("../input/day-3.txt", import.meta.url),
    );

    console.log(`   
    Day 3: \n
    - 🎆️ Part 1: ${part1(input)}\n
    - 🎇 Part 2: ${part2(input)}\n
    `);
}

export default day3;
