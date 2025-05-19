import dayOne from "./days/day-1.ts";
import dayTwo from "./days/day-2.ts";
import dayThree from "./days/day-3.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Advent of Code 2024 🎄\n");
  await dayOne();
  await dayTwo();
  await dayThree();
}
