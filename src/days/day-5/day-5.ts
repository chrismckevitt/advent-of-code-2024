import { add } from "../../utils/add/add.ts";

type RuleSet = number[];

type Rules = { lowRule: number; highRule: number };

const getRules = (
  ruleSet: RuleSet,
): Rules => ({
  lowRule: ruleSet[0],
  highRule: ruleSet[1],
});

type Update = number[];

type GetValidatedUpdatesProps = {
  updates: Update[];
  applicableRuleSets: RuleSet[][];
};

type UpdatesSplitByValidity = {
  validUpdates: Update[];
  invalidUpdates: Update[];
};

const splitUpdatesByValidity = (
  { updates, applicableRuleSets }: GetValidatedUpdatesProps,
): UpdatesSplitByValidity => {
  const validUpdates: Update[] = [];
  const invalidUpdates: Update[] = [];

  for (let i = 0; i < updates.length; i++) {
    const update = updates[i];
    const ruleSets = applicableRuleSets[i];

    for (let j = 0; j < ruleSets.length; j++) {
      const ruleSet = ruleSets[j];
      const { lowRule, highRule } = getRules(ruleSet);

      if (update.indexOf(lowRule) > update.indexOf(highRule)) {
        invalidUpdates.push(update);
        break;
      }

      if (j === ruleSets.length - 1) {
        validUpdates.push(update);
      }
    }
  }

  return { invalidUpdates, validUpdates };
};

type CheckIfValidUpdateProps = {
  update: Update;
  ruleSets: RuleSet[];
  onIsValid: (
    rule: number,
    // | { lowRule: number; highRule: number }, // fix
  ) => void;
};

const checkIfUpdateIsValid = (
  { update, ruleSets, onIsValid }: CheckIfValidUpdateProps,
): void => {
  for (let i = 0; i < ruleSets.length; i++) {
    const ruleSet = ruleSets[i];
    const { lowRule, highRule } = getRules(ruleSet);

    if (update.indexOf(lowRule) > update.indexOf(highRule)) {
      onIsValid(i);
    }
  }
};

type GetApplicableRuleSetsProps = { updates: Update[]; ruleSets: RuleSet[] };

const getApplicableRuleSets = (
  { updates, ruleSets }: GetApplicableRuleSetsProps,
): RuleSet[][] => {
  const applicableRuleSets: number[][][] = [];

  for (let i = 0; i < updates.length; i++) {
    applicableRuleSets[i] = [];
    const update = updates[i];

    checkIfUpdateIsValid({
      update,
      ruleSets,
      onIsValid: (idx) => applicableRuleSets[i].push(ruleSets[idx]),
    });
  }

  return applicableRuleSets;
};

type GetUpdatesProps = { rows: string[]; idx: number };

const getUpdates = (
  { rows, idx }: GetUpdatesProps,
): Update[] =>
  rows.slice(idx + 1).map((pageNums) =>
    pageNums.split(",").map((pageNum) => parseInt(pageNum))
  );

type GetRuleSetProps = { rows: string[]; idx: number };

const getRuleSet = ({ rows, idx }: GetRuleSetProps): RuleSet =>
  rows[idx].split("|").map((rule) => parseInt(rule));

type UpdatesAndRuleSets = {
  validUpdates: Update[];
  invalidUpdates: Update[];
  applicableRuleSets: RuleSet[][];
  updates: Update[];
  ruleSets: RuleSet[];
};

const getUpdatesAndRuleSets = (
  input: string,
): UpdatesAndRuleSets => {
  const rows = input.split(/\n/);

  let i = 0;
  const ruleSets: number[][] = [];

  while (rows[i] !== "") {
    const ruleSet = getRuleSet({ rows, idx: i });
    ruleSets.push(ruleSet);
    i++;
  }

  const updates = getUpdates({ rows, idx: i });
  const applicableRuleSets = getApplicableRuleSets({ updates, ruleSets });

  const { invalidUpdates, validUpdates } = splitUpdatesByValidity({
    updates,
    applicableRuleSets,
  });

  return {
    updates,
    invalidUpdates,
    validUpdates,
    ruleSets,
    applicableRuleSets,
  };
};

export const part1 = (input: string): number => {
  const { validUpdates } = getUpdatesAndRuleSets(input);

  return validUpdates.flatMap(
    (update) =>
      update.slice(
        Math.floor(update.length / 2),
        Math.floor(update.length / 2) + 1,
      ),
  ).reduce(add, 0);
};

// export const part2 = (input: string): number => {
//   const { updates, invalidUpdates, applicableRuleSets } =
//     getUpdatesAndRuleSets(
//       input,
//     );
//
//   const fixedUpdates: number[][] = [];
//
//   for (let i = 0; i < invalidUpdates.length; i++) {
//     const update = invalidUpdates[i];
//     const ruleSets = applicableRuleSets[updates.indexOf(update)];
//
//     while (
//       splitUpdatesByValidity({
//         updates: [update],
//         applicableRuleSets: [ruleSets],
//       }).invalidUpdates.length > 0
//     ) {
//       checkIfUpdateIsValid({
//         update,
//         ruleSets,
//         onIsValid: ({ lowRule, highRule }) =>
//           [
//             update[update.indexOf(lowRule)],
//             update[update.indexOf(highRule)],
//           ] = [
//             update[update.indexOf(highRule)],
//             update[update.indexOf(lowRule)],
//           ],
//       });
//     }
//
//     fixedUpdates.push(update);
//   }
//
//   return fixedUpdates.flatMap(
//     (update) =>
//       update.slice(
//         Math.floor(update.length / 2),
//         Math.floor(update.length / 2) + 1,
//       ),
//   ).reduce(add, 0);
// };

export function day5(input: string): void {
  console.log(`   
    Day 4: \n
    - 🏖️️ Part 1: ${part1(input)}\n
    - 🍺️ Part 2:
    `);
}

export default day5;
