// puzzle quest day 1, part 1: find the two entries that sum to 2020 and then multiply those two numbers together

import findAnswer, {
  findTwoNumbersForSum,
  findPartTwoAnswer,
  findThreeNumbersForSum,
  findSetsOfTwo,
  removeTooLarge,
  makeSetsOfThree,
} from ".";

describe("productOfTwoNumbersThatSumTo2020", () => {
  it("finds the product of two numbers in an array that sum to 2020", () => {
    expect(findAnswer([1721, 979, 366, 299, 675, 1456])).toBe(514579);
  });
  it("finds two numbers in an array that add to a target value", () => {
    expect(findTwoNumbersForSum([1, 3, 5], 4)).toStrictEqual([1, 3]);
  });
});

describe("productOfThreeNumbersThatSumTo2020", () => {
  it("finds the product of three numbers in an array that sum to 2020", () => {
    expect(findPartTwoAnswer([1721, 979, 366, 299, 675, 1456])).toBe(241861950);
  });
  it("finds three numbers in an array that add to a target value", () => {
    expect(findThreeNumbersForSum([1, 2, 3, 4], 8)).toStrictEqual([1, 3, 4]);
  });
  it("finds sets of two", () => {
    const setsOfTwo: Set<number[]> = new Set();
    setsOfTwo.add([1, 2]);
    setsOfTwo.add([1, 3]);
    setsOfTwo.add([2, 3]);
    expect(findSetsOfTwo([1, 2, 3])).toStrictEqual(setsOfTwo);
  });
  it("filters out sets of two that are too big", () => {
    const pairs: Set<number[]> = new Set();
    pairs.add([1, 2]);
    pairs.add([1, 3]);
    pairs.add([2, 3]);
    const expectedValue: Set<number[]> = new Set();
    expectedValue.add([1, 2]);
    expect(removeTooLarge(pairs, 3)).toStrictEqual(expectedValue);
  });
});
