import { findAnswerDaySeven, RuleSet } from ".";

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
  "light red": ["bright white", "muted yellow"],
  "dark orange": ["bright white", "muted yellow"],
  "bright white": ["shiny gold"],
  "muted yellow": ["shiny gold", "faded blue"],
};

const sampleInput =
  "light red bags contain 1 bright white bag, 2 muted yellow bags.";

const sampleInputNoChildren = "dotted black bags contain no other bags.";

describe("example", () => {
  it("finds the right answer", () => {
    expect(findAnswerDaySeven(testInput)).toBe(4);
  });
});

describe("RuleSet", () => {
  it("can make one node", () => {
    const rules = new RuleSet(testInput);
    expect(rules.makeRule(sampleInputNoChildren)).toStrictEqual({
      "dotted black": [],
    });
    expect(rules.makeRule(sampleInput)).toStrictEqual({
      "light red": ["bright white", "muted yellow"],
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
});
