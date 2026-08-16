import { add } from "../../utils/add/add.ts";

type Rule = { before: number; after: number };
type RuleIndices = { before: number; after: number };
type Update = number[];

export function day5(input: string) {
  console.log(`
    Day 5:
    - 🏖️️ Part 1: ${part1(input)}
    - 🍺️ Part 2: ${part2(input)}
  `);
}

export function part1(input: string): number {
  const rows = input.split("\n");
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
  const fixed = invalid.map((update) => fixUpdate(update, rules));

  return fixed
    .map(getMiddleItem)
    .reduce(add, 0);
}

// --- Core Logic ---
function fixUpdate(update: Update, rules: Rule[]): Update {
  const failing = getFailingRules(rules, update);

  swapRuleInPlace: while (updateIsNotValid(update, rules)) {
    for (const rule of failing) {
      swapRule(rule, update);
      if (updateIsValid(update, rules)) {
        break swapRuleInPlace;
      }
    }
  }

  return update;
}

function updateIsValid(update: Update, rules: Rule[]): boolean {
  const applicableRules = getApplicableRules(update, rules);
  return applicableRules.every((rule) => ruleIsOk(rule, update));
}

function updateIsNotValid(update: Update, rules: Rule[]): boolean {
  const applicableRules = getApplicableRules(update, rules);

  return applicableRules.some((rule) => ruleIsNotOk(rule, update));
}

function ruleIsNotOk(rule: Rule, update: Update): boolean {
  return update.indexOf(rule.before) > update.indexOf(rule.after);
}

function ruleIsOk(rule: Rule, update: Update): boolean {
  return update.indexOf(rule.before) < update.indexOf(rule.after);
}

function getApplicableRules(update: Update, rules: Rule[]): Rule[] {
  return rules.filter((rule) =>
    update.includes(rule.before) && update.includes(rule.after)
  );
}

function getFailingRules(rules: Rule[], update: Update): Rule[] {
  const applicableRules = getApplicableRules(update, rules);

  return applicableRules.filter((rule) => {
    return ruleIsNotOk(rule, update);
  });
}

function getRuleIndices(rule: Rule, update: Update): RuleIndices {
  return {
    before: update.indexOf(rule.before),
    after: update.indexOf(rule.after),
  };
}

function swapRule(rule: Rule, update: Update): void {
  const indices = getRuleIndices(rule, update);

  // Source - https://stackoverflow.com/a/872317
  // Posted by tvanfosson, modified by community. See post 'Timeline' for change history
  // Retrieved 2026-08-16, License - CC BY-SA 4.0

  // [arr[0], arr[1]] = [arr[1], arr[0]];
  [update[indices.before], update[indices.after]] = [
    update[indices.after],
    update[indices.before],
  ];
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

export default day5;
