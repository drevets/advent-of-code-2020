import { findAnswerDaySeven, findAnswerDaySevenPartTwo, RuleSet } from ".";

const testInput = [
  "light red bags contain 1 bright white bag, 2 muted yellow bags.",
  "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
  "bright white bags contain 1 shiny gold bag.",
  "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
  "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
  "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
  "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
  "faded blue bags contain no other bags.",
  "dotted black bags contain no other bags.",
];

const smallTestInput = [
  "light red bags contain 1 bright white bag, 2 muted yellow bags.",
  "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
  "bright white bags contain 1 shiny gold bag.",
  "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
];

const testNodes = {
  "light red": [
    { color: "bright white", quantity: 1 },
    { color: "muted yellow", quantity: 2 },
  ],
  "dark orange": [
    { color: "bright white", quantity: 3 },
    { color: "muted yellow", quantity: 4 },
  ],
  "bright white": [{ color: "shiny gold", quantity: 1 }],
  "muted yellow": [
    { color: "shiny gold", quantity: 2 },
    { color: "faded blue", quantity: 9 },
  ],
};

const sampleInput =
  "light red bags contain 1 bright white bag, 2 muted yellow bags.";

const sampleInputNoChildren = "dotted black bags contain no other bags.";

describe("example", () => {
  it("finds the right answer", () => {
    expect(findAnswerDaySeven(testInput)).toBe(4);
  });
  it("finds the right answer", () => {
    const s = [
      "shiny gold bags contain 2 dark red bags.",
      "dark red bags contain 2 dark orange bags.",
      "dark orange bags contain 2 dark yellow bags.",
      "dark yellow bags contain 2 dark green bags.",
      "dark green bags contain 2 dark blue bags.",
      "dark blue bags contain 2 dark violet bags.",
      "dark violet bags contain no other bags.",
    ];
    expect(findAnswerDaySevenPartTwo(s)).toBe(126);
  });
});

describe("RuleSet", () => {
  it("can make one node", () => {
    const rules = new RuleSet(testInput);
    expect(rules.makeRule(sampleInputNoChildren)).toStrictEqual({
      "dotted black": [],
    });
    expect(rules.makeRule(sampleInput)).toStrictEqual({
      "light red": [
        { color: "bright white", quantity: 1 },
        { color: "muted yellow", quantity: 2 },
      ],
    });
  });
  it("can make all nodes", () => {
    const rules = new RuleSet(smallTestInput);
    expect(rules.nodes).toStrictEqual(testNodes);
  });
  it("can tell me if a bag contains another bag", () => {
    const rules = new RuleSet([sampleInputNoChildren]);
    expect(rules.bagContains("dotted black", "shiny gold")).toEqual(false);
  });
  it("can go through more than one bag to tell me if there is a type of bag at the other end", () => {
    const rules = new RuleSet([
      "light red bags contain 1 dark orange bag, 2 muted yellow bags.",
      "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
      "bright white bags contain no other bags.",
      "muted yellow bags contain no other bags.",
    ]);
    expect(rules.bagContains("light red", "bright white")).toEqual(true);
  });
  it("can go through more than one bag to tell me if there is a type of bag at the other end", () => {
    const rules = new RuleSet([
      "light red bags contain 1 muted yellow bag, 2 dark orange bags.",
      "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
      "bright white bags contain no other bags.",
      "muted yellow bags contain no other bags.",
    ]);
    expect(rules.bagContains("light red", "bright white")).toEqual(true);
  });
  it("can get all bags", () => {
    const rules = new RuleSet([
      "light red bags contain 1 muted yellow bag, 2 dark orange bags.",
      "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
      "bright white bags contain no other bags.",
      "muted yellow bags contain no other bags.",
    ]);
    expect(rules.getBags().sort()).toStrictEqual(
      ["light red", "muted yellow", "dark orange", "bright white"].sort()
    );
  });
  it("can count bags inside", () => {
    const sample = [
      "light red bags contain 1 muted yellow bag, 2 dark orange bags.",
      "dark orange bags contain 3 bright white bags, 4 muted yellow bags, 8 dingy aqua bags.",
      "bright white bags contain no other bags.",
      "muted yellow bags contain no other bags.",
      "dingy aqua bags contain 1 sad green bag.",
      "sad green bags contain no other bags.",
      "morose purple bags contain 1 upset teal bag",
      "upset teal bags contain 1 manic vermillion bag",
      "manic vermillion bags contain no other bags.",
    ];
    const rules = new RuleSet(sample);

    expect(rules.containsBags("bright white")).toBe(0);
    expect(rules.containsBags("dingy aqua")).toBe(1);
    expect(rules.containsBags("morose purple")).toBe(2);
  });
  it("can count more bags inside", () => {
    const sample = [
      "light red bags contain 2 muted yellow bags.",
      "muted yellow bags contain 1 sad green bag.",
      "sad green bags contain no other bags.",
    ];
    const rules = new RuleSet(sample);
    expect(rules.containsBags("light red")).toBe(4);
  });
  it("can count even more bags inside", () => {
    const sample = [
      "light red bags contain 3 muted yellow bags.",
      "muted yellow bags contain 2 sad green bags.",
      "sad green bags contain no other bags.",
    ];
    const rules = new RuleSet(sample);
    expect(rules.containsBags("light red")).toBe(9);
  });
});

/*
bag bag
3 + 2 + 2 + 2

So, we need to know the NUMBER of bags, as well as if there's a gold bag eventually??

Actually, I just want to know how many bags are inside of a shiny gold bag.


So, input is the same, output is also a number.
* change structure of children

{"light red": {color: "muted yellow": quantity: 8}}




*/
