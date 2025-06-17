import { isAscending } from "../utils/is-ascending/is-ascending.ts";
import { isDescending } from "../utils/is-descending/is-descending.ts";

type Report = number[];

const safeReports: Report[] = [];
const fixedReports: Report[] = [];
const unsafeReports: Report[] = [];

function part1(data: Report[]) {
  for (let i = 0; i < data.length; i++) {
    if (isDescending(data[i]) || isAscending(data[i])) {
      safeReports.push(data[i]);
      continue;
    }

    unsafeReports.push(data[i]);
  }

  return safeReports.length;
}

function part2(data: Report[]) {
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      const testReport = data[i].toSpliced(j, 1);

      if (isDescending(testReport) || isAscending(testReport)) {
        fixedReports.push(testReport);
        break;
      }
    }
  }

  return safeReports.length + fixedReports.length;
}

function day2(input: string) {
  const data: Report[] = JSON.parse(input);

  console.log(`   
    Day 2: \n
    - ⛄️ Part 1: ${part1(data)}\n
    - 🎅 Part 2: ${part2(unsafeReports)}\n
    `);
}

export default day2;
