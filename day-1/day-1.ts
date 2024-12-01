type Data = [number[], number[]];

const part1 = (data: Data) =>
    [...data[0]].sort().map((leftCell, i) =>
        [leftCell, [...data[1]].sort()[i]].sort().reverse().reduce((a, b) =>
            a - b
        )
    ).reduce((a, b) => a + b);

const part2 = (data: Data) =>
    data[0].map((leftCell) =>
        leftCell *
        (data[1].filter((rightCell) => rightCell === leftCell).length)
    ).reduce((a, b) => a + b);

const day1 = async () => {
    const input = await Deno.readTextFile(
        new URL("./input.json", import.meta.url),
    );

    const data: Data = JSON.parse(input);

    console.log(`   
    Day 1: \n
    - ⛄️ Part 1: ${part1(data)}\n
    - 🎅 Part 2: ${part2(data)}\n
    `);
};

export default day1;
