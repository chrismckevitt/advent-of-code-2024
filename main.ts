import dayOne from "./day-1/day-1.ts";

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Advent of Code 2024 🎄");
    await dayOne();
}
