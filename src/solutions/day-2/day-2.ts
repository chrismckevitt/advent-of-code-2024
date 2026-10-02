export type Report = number[];

const TOLERANCE = 3;

const isWithinTolerance = (
  a: number,
  b: number,
  tolerance: number,
): boolean => {
  const diff = a - b;
  return diff >= 0 && diff <= tolerance;
};

const isAscendingWithinTolerance = (
  range: number[],
  tolerance: number,
): boolean => {
  for (let i = 0; i < range.length - 1; i++) {
    const a = range[i], b = range[i + 1];
    if (
      a < b &&
      isWithinTolerance(b, a, tolerance)
    ) {
      continue;
    }
    return false;
  }
  return true;
};

const isDescendingWithinTolerance = (
  range: number[],
  tolerance: number,
): boolean => {
  for (let i = 0; i < range.length - 1; i++) {
    const a = range[i], b = range[i + 1];
    if (
      a > b &&
      isWithinTolerance(a, b, tolerance)
    ) {
      continue;
    }
    return false;
  }
  return true;
};

export const part1 = (data: Report[]): number => {
  const safeReports: Report[] = [];

  for (let i = 0; i < data.length; i++) {
    if (
      isDescendingWithinTolerance(data[i], TOLERANCE) ||
      isAscendingWithinTolerance(data[i], TOLERANCE)
    ) {
      safeReports.push(data[i]);
    }
  }

  return safeReports.length;
};

export const part2 = (data: Report[]): number => {
  const safeReports: Report[] = [];
  const fixedReports: Report[] = [];
  const unsafeReports: Report[] = [];

  for (let i = 0; i < data.length; i++) {
    if (
      isDescendingWithinTolerance(data[i], TOLERANCE) ||
      isAscendingWithinTolerance(data[i], TOLERANCE)
    ) {
      safeReports.push(data[i]);
      continue;
    }

    unsafeReports.push(data[i]);
  }

  for (let i = 0; i < unsafeReports.length; i++) {
    for (let j = 0; j < unsafeReports[i].length; j++) {
      const testReport = unsafeReports[i].toSpliced(j, 1);

      if (
        isDescendingWithinTolerance(testReport, TOLERANCE) ||
        isAscendingWithinTolerance(testReport, TOLERANCE)
      ) {
        fixedReports.push(testReport);
        break;
      }
    }
  }

  return safeReports.length + fixedReports.length;
};

function day2(input: string): void {
  const data: Report[] = JSON.parse(input);

  console.log(`   
    Day 2: \n
    - ⛄️ Part 1: ${part1(data)}\n
    - 🎅 Part 2: ${part2(data)}\n
    `);
}

export default day2;
