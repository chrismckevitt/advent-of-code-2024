import { isWithinTolerance } from "../is-within-tolerance/is-within-tolerance.ts";

export function isDescending(range: number[]) {
  for (let i = 0; i < range.length - 1; i++) {
    if (
      range[i] > range[i + 1] &&
      isWithinTolerance(range[i], range[i + 1])
    ) {
      continue;
    }
    return false;
  }
  return true;
}
