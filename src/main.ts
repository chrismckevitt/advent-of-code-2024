import day1 from "./days/day-1.ts";
import day2 from "./days/day-2.ts";
import day3 from "./days/day-3.ts";
import day4 from "./days/day-4.ts";
import day5 from "./days/day-5.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Advent of Code 2024 🎄\n");

  const day1Input = await Deno.readTextFile(
    new URL("../input/day-1.json", import.meta.url),
  );

  day1(day1Input);

  const day2Input = await Deno.readTextFile(
    new URL("../input/day-2.json", import.meta.url),
  );

  day2(day2Input);

  const day3Input = await Deno.readTextFile(
    new URL("../input/day-3.txt", import.meta.url),
  );

  day3(day3Input);

  const day4Input = await Deno.readTextFile(
    new URL("../input/day-4.txt", import.meta.url),
  );

  day4(day4Input);

  day5("x");
}
