import day1 from "./days/day-1/day-1.ts";
import day2 from "./days/day-2/day-2.ts";
import day3 from "./days/day-3/day-3.ts";
import day4 from "./days/day-4/day-4.ts";
import day5 from "./days/day-5/day-5.ts";

type DayFn = (input: string) => void;

const DAYS = {
  day1: [day1, "../input/day-1.json"],
  day2: [day2, "../input/day-2.json"],
  day3: [day3, "../input/day-3.txt"],
  day4: [day4, "../input/day-4.txt"],
  day5: [day5, "../input/day-5.txt"],
} satisfies Record<string, [DayFn, string]>;

const run = async (
  fn: DayFn,
  path: string,
): Promise<void> => {
  const input = await Deno.readTextFile(
    new URL(path, import.meta.url),
  );

  fn(input);
};

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Advent of Code 2024 🎄\n");

  Object.values(DAYS).forEach((day) => {
    const [fn, path] = day;

    void run(fn, path);
  });
}
