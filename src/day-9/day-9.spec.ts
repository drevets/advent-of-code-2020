/*
OK, so ...
we have a preamble fo 25 numbers
After that, any number should be the sum of any two of the 25 immediately preceeding numbers
The two numbers will have different values
There might be more than one such pair

 find the first number in the list (after the preamble) which is not the sum of two of the 25 numbers before it. What is the first number that does not have this property?

 so ... what is my approach

 Starting from the preamble-ith number, ask, are there at least numbers in the preamble that sum to it? The numbers cannot be the same ....

 OK, so ... part two


 find a continuous set of at least two numbers in my list, which sum to the invalid number from part 1

 to find the encryption weakness,add together the smallest and largest number in this contiguous range


 so, I want to go through a range and find a contiguous array



*/

import {
  findAnswerD9P2,
  findSumFriends,
  findTheUnsum,
  sumFriendYouAre,
} from ".";

describe("find answer day 9", () => {
  const input = [
    "35",
    "20",
    "15",
    "25",
    "47",
    "40",
    "62",
    "55",
    "65",
    "95",
    "102",
    "117",
    "150",
    "182",
    "127",
    "219",
    "299",
    "277",
    "309",
    "576",
  ].map((i) => +i);
  it("can find answer to part one", () => {
    expect(findTheUnsum(input, 5)).toBe(127);
  });
  it("can find the answer to part 2", () => {
    expect(findAnswerD9P2(input, 5)).toBe(62);
  });
});

describe("sumFriendYouAre", () => {
  it("knows if an array contains two numbers that sum to a target", () => {
    expect(sumFriendYouAre([], 1)).toBe(false);
    expect(sumFriendYouAre([1], 1)).toBe(false);
    expect(sumFriendYouAre([1, 2], 2)).toBe(false);
    expect(sumFriendYouAre([1, 2, 3], 5)).toBe(true);
  });
  it("does not let the summers be the same", () => {
    expect(sumFriendYouAre([1, 1], 2)).toBe(false);
  });
});

describe("Find answer", () => {
  it("can check in a small array", () => {
    expect(findTheUnsum([1, 2, 3, 5, 43, 48], 2)).toBe(43);
  });
});

describe("find sum friends", () => {
  it("returns an array of numbers that sum to a target", () => {
    expect(findSumFriends([1], 1)).toStrictEqual([1]);
    expect(findSumFriends([1, 2], 3)).toStrictEqual([1, 2]);
    expect(findSumFriends([1, 2, 3], 3)).toStrictEqual([1, 2]);
    expect(findSumFriends([1, 2, 3, 8, 22, 34], 64)).toStrictEqual([8, 22, 34]);
  });
});
