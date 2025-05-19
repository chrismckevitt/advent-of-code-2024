import { add } from "../utils/add.util.ts";
import { subtract } from "../utils/subtract.util.ts";
import { DataDay1 } from "../types/dataDay1.type.ts";

const part1 = (data: DataDay1) =>
    [...data[0]].sort().map((leftCell, i) =>
        [leftCell, [...data[1]].sort()[i]].sort().reverse().reduce(subtract)
    ).reduce(add);

const part2 = (data: DataDay1) =>
    data[0].map((leftCell) =>
        leftCell *
        (data[1].filter((rightCell) => rightCell === leftCell).length)
    ).reduce(add);

async function day1() {
    const input = await Deno.readTextFile(
        new URL("../input/day1.json", import.meta.url),
    );

    const data: DataDay1 = JSON.parse(input);

    console.log(`   
    Day 1: \n
    - ⛄️ Part 1: ${part1(data)}\n
    - 🎅 Part 2: ${part2(data)}\n
    `);
}

export default day1;
