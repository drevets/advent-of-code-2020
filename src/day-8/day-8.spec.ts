/*

Run the code.
Immediately before a line of code is run again
What is the value in the accumulator

Keep track of:
* what rules have been run
* value of accumulator
* what rule I'm on

could have class Compy
each time run a rule, add it to a set
Before run a rule, check to see if it's in the set

*/

import {
  Compy,
  findAnswerDayEight,
  findAnswerDayEightPartTwo,
  fixCode,
} from ".";

describe("find answer day eight", () => {
  it("can find the correct answer for part one", () => {
    const a = [
      "nop +0",
      "acc +1",
      "jmp +4",
      "acc +3",
      "jmp -3",
      "acc -99",
      "acc +1",
      "jmp -4",
      "acc +6",
    ];
    expect(findAnswerDayEight(a)).toBe(5);
  });
});

describe("Compy", () => {
  it("can make operations", () => {
    const a = ["nop +0", "acc +1", "jmp -3"];
    const o = [
      { no: 0, type: "nop", value: 0 },
      { no: 1, type: "acc", value: 1 },
      { no: 2, type: "jmp", value: -3 },
    ];
    const compy = new Compy(a);
    expect(compy.operations).toStrictEqual(o);
  });
  it("can process one nop operation", () => {
    const a = ["nop +0"];
    const compy = new Compy(a);
    compy.compute();
    expect(compy.processed).toStrictEqual(new Set([0]));
    expect(compy.terminated).toBe(true);
  });
  it("can process one acc operation", () => {
    const a = ["acc +1"];
    const compy = new Compy(a);
    compy.compute();
    expect(compy.processed).toStrictEqual(new Set([0]));
    expect(compy.accumulator).toBe(1);
  });
  it("can process a jump operation", () => {
    const a = ["jmp +2", "nop +0", "acc +1"];
    const compy = new Compy(a);
    compy.compute();
    expect(compy.processed).toStrictEqual(new Set([0, 2]));
    expect(compy.accumulator).toBe(1);
  });
  it("does not process an operation twice", () => {
    const a = ["jmp +2", "nop +0", "acc +1", "jmp -2"];
    const compy = new Compy(a);
    compy.compute();
    expect(compy.processed).toStrictEqual(new Set([0, 2, 3, 1]));
    expect(compy.accumulator).toBe(1);
    expect(compy.terminated).toBe(false);
  });
});

describe("fix code", () => {
  it("can switch jmp to nop and vice versa", () => {
    expect(fixCode({ no: 0, type: "nop", value: 0 })).toStrictEqual({
      no: 0,
      type: "jmp",
      value: 0,
    });
    expect(fixCode({ no: 0, type: "jmp", value: 0 })).toStrictEqual({
      no: 0,
      type: "nop",
      value: 0,
    });
  });
});

describe("find answer day 8 part two", () => {
  it("finds the right answer", () => {
    const a = [
      "nop +0",
      "acc +1",
      "jmp +4",
      "acc +3",
      "jmp -3",
      "acc -99",
      "acc +1",
      "jmp -4",
      "acc +6",
    ];
    expect(findAnswerDayEightPartTwo(a)).toBe(8);
  });
});
