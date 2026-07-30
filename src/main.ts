import day1 from "./puzzles/day-1/day-1.ts";
import day2 from "./puzzles/day-2/day-2.ts";
import day3 from "./puzzles/day-3/day-3.ts";
import day4 from "./puzzles/day-4/day-4.ts";
import day5 from "./puzzles/day-5/day-5.ts";
import { cconsole } from "./utils/cconsole/cconsole.ts";

type Puzzle = (input: string) => void;

const PUZZLES = {
  day1: [day1, "../input/day-1.json"],
  day2: [day2, "../input/day-2.json"],
  day3: [day3, "../input/day-3.txt"],
  day4: [day4, "../input/day-4.txt"],
  day5: [day5, "../input/day-5.txt"],
} satisfies Record<string, [Puzzle, string]>;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Advent of Code 2024 🎄\n");

  for (const [puzzle, filepath] of Object.values(PUZZLES)) {
    await run(puzzle, filepath);
  }
}

async function run(
  puzzle: Puzzle,
  filepath: string
) {
  const input = await getInput(filepath);
  if (!input) return;
  puzzle(input);

};

async function getInput(filepath: string) {
  try {
    const input = await Deno.readTextFile(
      new URL(filepath, import.meta.url),
    );

    return input;
  } catch (error) {
    cconsole.error(`Error reading file "${filepath}"\n${JSON.stringify(error, null, 2)}\n`);
  }
}
