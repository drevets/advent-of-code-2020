import { bisect, findAnswerPartOne, findSeatId, findMySeat } from ".";

describe("day five example", () => {
  it("example answer", () => {
    expect(findAnswerPartOne(["BFFFBBFRRR", "FFFBBBFRRR", "BBFFBBFRLL"])).toBe(
      820
    );
  });
  it("example rows", () => {
    expect(findSeatId("FBFBBFFRLR")).toBe(357);
    expect(findSeatId("FFFBBBFRRR")).toBe(119);
    expect(findSeatId("BBFFBBFRLL")).toBe(820);
  });
});

describe("bisect", () => {
  it("can parse a very simple input", () => {
    expect(bisect("B", [0, 1])).toStrictEqual(1);
    expect(bisect("B", [0, 2])).toStrictEqual(2);
    expect(bisect("B", [0, 3])).toStrictEqual(3);
  });
  it("can parse slightly more complex input", () => {
    expect(bisect("BFF", [0, 4])).toStrictEqual(2);
    expect(bisect("FBFBBFF", [0, 127])).toStrictEqual(44);
  });
});

describe("findMySeat", () => {
  it("can find my seat by process of limination", () => {
    expect(findMySeat(new Set([3, 5]), 5)).toStrictEqual(4);
    expect(findMySeat(new Set([3, 4, 5, 6, 8, 9, 10]), 10)).toStrictEqual(7);
    expect(findMySeat(new Set([5, 8, 10]), 10)).toStrictEqual(9);
  });
});
