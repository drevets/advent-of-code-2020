import { Field, findPartOneAnswer, findPartTwoAnswer } from ".";

const testInput = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

describe("findAnswer", () => {
  it("can find the answer to the test input", () => {
    expect(findPartOneAnswer(testInput)).toBe(7);
  });
  it("can find the answer to the test input with y slope greater than 1", () => {
    expect(findPartOneAnswer(testInput, [1, 2])).toBe(2);
  });
});

describe("Field", () => {
  it("knows if there is a tree at a given location,", () => {
    const field = new Field(testInput, [3, 1]);
    expect(field.isTree(0, 0)).toBe(false);
    expect(field.isTree(3, 0)).toBe(true);
    expect(field.isTree(12, 0)).toBe(false);
  });
  it("can traverse one,", () => {
    const field = new Field(testInput, [3, 1]);
    field.traverseOne();
    expect(field.currentLocation).toStrictEqual([3, 1]);
  });
  it("can traverse one with a slope with y value greater than 1,", () => {
    const field = new Field(testInput, [1, 2]);
    field.traverseOne();
    expect(field.currentLocation).toStrictEqual([1, 2]);
  });
});

describe("findAnswer", () => {
  it("can find the answer to the test input", () => {
    expect(findPartTwoAnswer(testInput)).toBe(336);
  });
});
