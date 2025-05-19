import { isAscending } from "../utils/isAscending.util.ts";
import { isDescending } from "../utils/isDescending.util.ts";
import { DataDay2 } from "../types/dataDay2.type.ts";

const safeReports: DataDay2 = [];
const fixedReports: DataDay2 = [];
const unsafeReports: DataDay2 = [];

const part1 = (data: DataDay2) => {
    for (let i = 0; i < data.length; i++) {
        if (isDescending(data[i]) || isAscending(data[i])) {
            safeReports.push(data[i]);
        } else {
            unsafeReports.push(data[i]);
        }
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

async function day2() {
    const input = await Deno.readTextFile(
        new URL("../input/day2.json", import.meta.url),
    );

    const data: DataDay2 = JSON.parse(input);

    console.log(`   
    Day 2: \n
    - ⛄️ Part 1: ${part1(data)}\n
    - 🎅 Part 2: ${part2(unsafeReports)}\n
    `);
}

export default day2;
