import dayOne from "./src/days/day-1.ts";
import dayTwo from "./src/days/day-2.ts";
import dayThree from "./src/days/day-3.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Advent of Code 2024 🎄\n");

  const dayOneInput = await Deno.readTextFile(
    new URL("./input/day1.json", import.meta.url),
  );

  dayOne(dayOneInput);

  const day2Input = await Deno.readTextFile(
    new URL("./input/day2.json", import.meta.url),
  );

  dayTwo(day2Input);

  const day3Input = await Deno.readTextFile(
    new URL("./input/day3.txt", import.meta.url),
  );

  dayThree(day3Input);
}
