import { add } from "../../utils/add/add.ts";

type Rule = { before: number; after: number };
type Update = number[];
type Slice = [number, number];

export function day5(input: string) {
  console.log(`
    Day 5:\n
    - 🏖️️ Part 1: ${part1(input)}\n
    - 🍺️ Part 2: ${part2(input)}\n
  `);
}

export function part1(input: string): number {
  const rows = input.trim().split("\n");
  const [ruleRows, updateRows] = splitByDelimiter(rows, "");

  const rules = ruleRows.map(parseRule);
  const updates = updateRows.map(parseUpdate);

  const valid = updates.filter((update) => updateIsValid(update, rules));

  return valid
    .map(getMiddleItem)
    .reduce(add, 0);
}

export function part2(input: string): number {
  const rows = input.split("\n");
  const [ruleRows, updateRows] = splitByDelimiter(rows, "");

  const rules = ruleRows.map(parseRule);
  const updates = updateRows.map(parseUpdate);
  const invalid = updates.filter((update) => updateIsNotValid(update, rules));

  const fixed = invalid.map((update) => sortUpdate(update, rules));

  return fixed.map(getMiddleItem)
    .reduce(add, 0);

  return 0;
}

// --- Core Logic ---
function updateIsValid(update: Update, rules: Rule[]): boolean {
  const applicable = getApplicableRules(update, rules);

  return applicable.every((rule) => rulePasses(rule, update));
}

function updateIsNotValid(update: Update, rules: Rule[]): boolean {
  const applicable = getApplicableRules(update, rules);

  return applicable.some((rule) => ruleFails(rule, update));
}

function ruleFails(rule: Rule, update: Update): boolean {
  return update.indexOf(rule.before) > update.indexOf(rule.after);
}

function rulePasses(rule: Rule, update: Update): boolean {
  return update.indexOf(rule.before) < update.indexOf(rule.after);
}

function sortUpdate(update: Update, rules: Rule[]) {
  return update.sort((a, b) => {
    const slice = [a, b] satisfies Slice;
    const rule = getSliceRule(slice, rules);
    return compare(slice, rule);
  });
}

function compare(slice: Slice, rule: Rule) {
  if (rulePasses(rule, slice)) return 1;
  if (ruleFails(rule, slice)) return -1;
  return 0;
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
  const middle = Math.floor(items.length / 2);
  return items[middle];
}

function splitByDelimiter(
  buffer: string[],
  delimiter: string,
): [string[], string[]] {
  const idx = buffer.indexOf(delimiter);

  if (idx === -1) {
    throw new Error(
      `'${delimiter}' not found in ${JSON.stringify(buffer, null, 2)}.\n`,
    );
  }

  const left = buffer.slice(0, idx);
  const right = buffer.slice(
    idx + 1,
    buffer.length,
  );

  return [left, right];
}

function getApplicableRules(update: Update, rules: Rule[]): Rule[] {
  return rules.filter((rule) =>
    update.includes(rule.before) && update.includes(rule.after)
  );
}

function getSliceRule(slice: Slice, rules: Rule[]): Rule {
  const applicable = getApplicableRules(slice, rules);
  if (applicable.length !== 1) {
    throw new Error(`Multiple rules found for slice ${JSON.stringify(slice)}`);
  }
  return applicable[0];
}

export default day5;
