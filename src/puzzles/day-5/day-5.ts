import { add } from "../../utils/add/add.ts";
import { cconsole } from "../../utils/cconsole/cconsole.ts";

type Rule = { before: number; after: number };
type Update = number[];

export function day5(input: string) {
  console.log(`   
    Day 5: 
    - 🏖️️ Part 1: ${part1(input)}
    - 🍺️ Part 2: TBD
  `);
}

export function part1(input: string): number {
  const rows = input.split("\n");
  const [ruleRows, updateRows] = splitByDelimiter(rows, "");

  const rules = ruleRows.map(parseRule);
  const updates = updateRows.map(parseUpdate);

  const validUpdates = updates.filter((update) => isUpdateValid(update, rules));

  return validUpdates
    .map(getMiddleItem)
    .reduce(add, 0);
}

export function part2(input: string): number {
  const rows = input.split("\n");
  const [ruleRows, updateRows] = splitByDelimiter(rows, "");

  const rules = ruleRows.map(parseRule);
  const updates = updateRows.map(parseUpdate);

  const invalidUpdates = updates.filter((update) => isUpdateInvalid(update, rules));

  cconsole.log(`invalidUpdates.length: ${invalidUpdates.length}`)

  return 0;
}

// --- Core Logic ---
function isUpdateValid(update: Update, rules: Rule[]): boolean {
  const applicableRules = getApplicableRules(update, rules);

  return applicableRules.every((rule) => {
    const beforeIndex = update.indexOf(rule.before);
    const afterIndex = update.indexOf(rule.after);

    return beforeIndex < afterIndex;
  });
}

function isUpdateInvalid(update: Update, rules: Rule[]): boolean {
  const applicableRules = getApplicableRules(update, rules);

  return applicableRules.some((rule) => {
    const beforeIndex = update.indexOf(rule.before);
    const afterIndex = update.indexOf(rule.after);

    return beforeIndex > afterIndex;
  });
}

function getApplicableRules(update: Update, rules: Rule[]): Rule[] {
  return rules.filter((rule) =>
    update.includes(rule.before) && update.includes(rule.after)
  );
}

// --- Parsing ---
function parseRule(row: string): Rule {
  const [before, after] = row.split("|").map((num) => parseInt(num, 10));
  return { before, after };
}

function parseUpdate(row: string): Update {
  return row.split(",").map((num) => parseInt(num, 10));
}

// --- Utilities ---
function getMiddleItem<Item>(items: Item[]): Item {
  const middleIndex = Math.floor(items.length / 2);
  return items[middleIndex];
}

function splitByDelimiter(rows: string[], delimiter: string): [string[], string[]] {
  const delimiterIndex = rows.indexOf(delimiter);

  if (delimiterIndex === -1) {
    throw new Error(`Delimiter '${delimiter}' not found in the rows array.`);
  }

  const itemsBeforeDelimiter = rows.slice(0, delimiterIndex);
  const itemsAfterDelimiter = rows.slice(delimiterIndex + 1);

  return [itemsBeforeDelimiter, itemsAfterDelimiter];
}

export default day5;