type Report = number[];
type Data = Report[];

const safeReports: Data = [];
const unsafeReports: Data = [];
const fixedReports: Data = [];

const isWithinTolerance = (larger: number, smaller: number) =>
  (larger - smaller) <= 3;

const isDescending = (report: Report) => {
  for (let i = 0; i < report.length - 1; i++) {
    if (
      report[i] > report[i + 1] &&
      isWithinTolerance(report[i], report[i + 1])
    ) {
      continue;
    }
    return false;
  }
  return true;
};

const isAscending = (report: Report) => {
  for (let i = 0; i < report.length - 1; i++) {
    if (
      report[i] < report[i + 1] &&
      isWithinTolerance(report[i + 1], report[i])
    ) {
      continue;
    }
    return false;
  }
  return true;
};

const part1 = (data: Data) => {
  for (let i = 0; i < data.length; i++) {
    if (isDescending(data[i]) || isAscending(data[i])) {
      safeReports.push(data[i]);
    } else {
      unsafeReports.push(data[i]);
    }
  }

  return safeReports.length;
};

const part2 = (data: Data) => {
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

async function day2() {
  const input = await Deno.readTextFile(
    new URL("../input/day-2.json", import.meta.url),
  );

  const data: Data = JSON.parse(input);

  console.log(`   
    Day 2: \n
    - ⛄️ Part 1: ${part1(data)}\n
    - 🎅 Part 2: ${part2(unsafeReports)}\n
    `);
}

export default day2;
