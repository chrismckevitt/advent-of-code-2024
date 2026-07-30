import { add } from "../../utils/add/add.ts";
import { subtract } from "../../utils/subtract/subtract.ts";

export type Data = [number[], number[]];

export const part1 = (data: Data): number =>
  [...data[0]].sort().map((leftCell, i) =>
    [leftCell, [...data[1]].sort()[i]].sort().reverse().reduce(subtract)
  ).reduce(add);

export const part2 = (data: Data): number =>
  data[0].map((leftCell) =>
    leftCell *
    (data[1].filter((rightCell) => rightCell === leftCell).length)
  ).reduce(add);

export default function (input: string) {
  const data: Data = JSON.parse(input);

  console.log(`   
    Day 1: \n
    - ⛄️ Part 1: ${part1(data)}\n
    - 🎅 Part 2: ${part2(data)}\n
    `);
}
