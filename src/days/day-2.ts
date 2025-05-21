import { isAscending } from "../utils/is-ascending/is-ascending.ts";
import { isDescending } from "../utils/is-descending/is-descending.ts";
import { DataDay2 } from "../types/day-2-data.ts";

const safeReports: DataDay2 = [];
const fixedReports: DataDay2 = [];
const unsafeReports: DataDay2 = [];

const part1 = (data: DataDay2) => {
  for (let i = 0; i < data.length; i++) {
    if (isDescending(data[i]) || isAscending(data[i])) {
      safeReports.push(data[i]);
      continue;
    }

    unsafeReports.push(data[i]);
  }

  return safeReports.length;
};

const part2 = (data: DataDay2) => {
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
};

function day2(input: string) {
  const data: DataDay2 = JSON.parse(input);

  console.log(`   
    Day 2: \n
    - ⛄️ Part 1: ${part1(data)}\n
    - 🎅 Part 2: ${part2(unsafeReports)}\n
    `);
}

export default day2;
