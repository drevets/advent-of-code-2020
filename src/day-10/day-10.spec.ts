import {
  day10Part1,
  day10Part2,
  Descendor,
  findDifferences,
  findInstances,
  makeVoltages,
} from ".";

describe("day10Part1", () => {
  it("finds the right answer", () => {
    const input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
    const inputTwo = [
      28,
      33,
      18,
      42,
      31,
      14,
      46,
      20,
      48,
      47,
      24,
      23,
      49,
      45,
      19,
      38,
      39,
      11,
      1,
      32,
      25,
      35,
      8,
      17,
      7,
      9,
      4,
      2,
      34,
      10,
      3,
    ];

    expect(day10Part1(input)).toBe(35);
    expect(day10Part1(inputTwo)).toBe(220);
  });
});

describe("makeVoltages", () => {
  it("makes an array of voltages to examine", () => {
    const input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
    expect(makeVoltages(input, 0, 3)).toStrictEqual([
      0,
      1,
      4,
      5,
      6,
      7,
      10,
      11,
      12,
      15,
      16,
      19,
      22,
    ]);
  });
});

describe("find differences", () => {
  it("in a sorted array, it finds differences between consecutive numbers", () => {
    const input = [0, 1, 4, 5];
    expect(findDifferences(input)).toStrictEqual([1, 3, 1]);
  });
});

describe("find instances", () => {
  it("counts instances of a value in an array ", () => {
    expect(findInstances([0], 3)).toStrictEqual(0);
    expect(findInstances([3], 3)).toStrictEqual(1);
    expect(findInstances([3, 3], 3)).toStrictEqual(2);
  });
});

xdescribe("day10Part2", () => {
  const input = [16, 10, 15, 5, 1, 11, 7, 19, 6, 12, 4];
  const inputTwo = [
    28,
    33,
    18,
    42,
    31,
    14,
    46,
    20,
    48,
    47,
    24,
    23,
    49,
    45,
    19,
    38,
    39,
    11,
    1,
    32,
    25,
    35,
    8,
    17,
    7,
    9,
    4,
    2,
    34,
    10,
    3,
  ];
  expect(day10Part2(input)).toBe(8);
  expect(day10Part2(inputTwo)).toBe(19208);
});

describe("Descendor", () => {
  const descendor = new Descendor([]);
});
