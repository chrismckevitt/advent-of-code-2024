import day1 from "./solutions/day-1/day-1.ts";
import day2 from "./solutions/day-2/day-2.ts";
import day3 from "./solutions/day-3/day-3.ts";
import day4 from "./solutions/day-4/day-4.ts";
import day5 from "./solutions/day-5/day-5.ts";
import day6 from "./solutions/day-6/day-6.ts";

const SOLUTIONS = {
  day1: [day1, "../input/day-1.json"],
  day2: [day2, "../input/day-2.json"],
  day3: [day3, "../input/day-3.txt"],
  day4: [day4, "../input/day-4.txt"],
  day5: [day5, "../input/day-5.txt"],
  day6: [day6, "../input/day-6.txt"],
} satisfies Record<string, [(input: string) => void, string]>;

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Advent of Code 2024 🎄\n");

  for (const [solver, inputPath] of Object.values(SOLUTIONS)) {
    run(solver, inputPath);
  }
}

async function run(
  solution: (input: string) => void,
  inputPath: string,
) {
  const input = await getInput(inputPath);
  if (!input) return;
  solution(input);
}

async function getInput(inputPath: string) {
  try {
    const input = await Deno.readTextFile(
      new URL(inputPath, import.meta.url),
    );

    return input;
  } catch (error) {
    console.error(
      `Error reading file "${inputPath}"\n${JSON.stringify(error, null, 2)}\n`,
    );
  }
}
