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

/* part two:
// some of the seats at the very back and very front of the plane aren't there
// I want to find the missing one that also has valid values on either side


[4,5,6,8,9,10]
[3,10,13,14,16]
// current is 14
// next is 16
// shouldBeNext = 15


*/
