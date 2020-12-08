/*

light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.


{"light red": ["bright white", "muted yellow"],
"dark orange": ["bright white", "muted yellow"],
"faded blue": []
}

{
  "light red": ["bright white", "muted yellow"]
}

expect(ruleSet.childrenOf("light red")).toBe(["bright white", "muted yellow"])

{
  "light red": [{color: "bright white", count: 2}, {color: "muted yellow", count: 1}]
}

function childrenOf(blah) {
  foo.map(......)
}

does tree have element
does superBag have subBag
if superBag has emptyArray, return false

superbag1 -> superbag2 -> superbag3 -> shiny gold

return true or false for whether superbag has shiny gold somewhere in its traversal

*/

import puzzleInputDaySeven from "./input";

export class RuleSet {
  nodes: { [index: string]: { color: string; quantity: number }[] };

  constructor(input: string[]) {
    const rules = input.map((rule) => this.makeRule(rule));
    this.nodes = rules.reduce((acc, curr) => ({ ...curr, ...acc }), {});
  }

  getBags(): string[] {
    return Object.keys(this.nodes);
  }

  bagContains(superbagName: string, childbagName: string): boolean {
    const nodeChildren = this.nodes[superbagName].map((bag) => bag.color);
    if (!nodeChildren.length) {
      return false;
    }
    if (nodeChildren.includes(childbagName)) {
      return true;
    }
    if (
      nodeChildren
        .map((child) => this.bagContains(child, childbagName))
        .filter((e) => !!e).length
    ) {
      return true;
    }
    return false;
  }

  containsBags(superbagName: string): number {
    const childBags = this.nodes[superbagName];
    let totalBags = 0;
    if (!childBags.length) {
      return totalBags;
    }
    for (let i = 0; i < childBags.length; i += 1) {
      const childBag = childBags[i];
      totalBags += childBag.quantity;
      for (let j = 0; j < childBag.quantity; j += 1) {
        totalBags += this.containsBags(childBag.color);
      }
    }
    return totalBags;
  }

  makeRule(
    input: string
  ): { [index: string]: { color: string; quantity: number }[] } {
    const superbagColor = this.getSuperbagColor(input);
    if (this.hasNoChildren(input)) {
      return { [superbagColor]: [] };
    }
    const children = this.makeChilds(input);
    return { [superbagColor]: children };
  }

  private getSuperbagColor(input: string): string {
    const [superbagColor, ...rest] = input.split("bags");
    return superbagColor.trim();
  }

  private hasNoChildren(input: string): boolean {
    return input.includes("contain no other bags");
  }

  private makeChilds(input: string): { color: string; quantity: number }[] {
    const [first, rest] = input.split("contain");
    const childrenBagColors = rest.split(",");
    return childrenBagColors.map((bag) => {
      return this.findColorAndQuantity(bag);
    });
  }

  private findColorAndQuantity(
    input: string
  ): { color: string; quantity: number } {
    const [numberAndColor, rest] = input.split("bag");
    const [number, adj, color] = numberAndColor.trim().split(" ");
    const fullColor = `${adj} ${color}`;
    return { color: fullColor, quantity: parseInt(number, 10) };
  }
}

export const findAnswerDaySeven = (input: string[]): number => {
  const rules = new RuleSet(input);
  const bags = rules.getBags();
  return bags
    .map((bag) => rules.bagContains(bag, "shiny gold"))
    .filter((b) => b).length;
};

export const findAnswerDaySevenPartTwo = (input: string[]): number => {
  const rules = new RuleSet(input);
  return rules.containsBags("shiny gold");
};
