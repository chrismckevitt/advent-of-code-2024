import { isWithinTolerance } from "../is-within-tolerance/is-within-tolerance.ts";
import { Report } from "../../types/report.ts";

export const isDescending = (report: Report) => {
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
