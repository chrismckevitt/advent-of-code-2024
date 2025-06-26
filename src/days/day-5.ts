const INPUT = `47|53
97|13
97|61
97|47
75|29
61|13
75|53
29|13
97|29
53|29
61|53
97|53
61|29
47|13
75|47
97|75
47|61
75|61
47|29
75|13
53|13

75,47,61,53,29
97,61,53,29,13
75,29,13
75,97,47,61,53
61,13,29
97,13,75,29,47`;

function part1(input: string) {
  const rows = input.split(/\n/);

  let i = 0;
  const rules: number[][] = [];

  while (rows[i] !== "") {
    const rule = rows[i].split("|").map((rule) => parseInt(rule));

    rules.push(rule);
    i++;
  }

  const cases = rows.slice(i + 1);

  console.log(rules, cases);

  return null;
}

function day4(input: string) {
  console.log(`   
    Day 4: \n
    - 🏖️️ Part 1: ${part1(INPUT)}\n
    `);
}

export default day4;
