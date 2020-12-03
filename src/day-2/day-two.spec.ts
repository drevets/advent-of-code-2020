/*
1-3 a: abcde
`${min} - ${max} ${letter}: ${password}`

rule: the password must have the specified letter occur at least once, but no more than the max (inclusive) times

// could transform the strings into an object of shape
// {min, max, letter, password, letterFreq}
// letterFreq could be object with {letter: freq} for each letter of password
// so ask letterFreqs = pwData[letterFreq]
// letterFreqs[letter] >= min && <= max
*/

/*
`${firstCharIndex+1} - ${secondCharIndex+1} ${letter}: ${password}`

Rule: letter must occur either the first or the second charIndex+1
*/

import {
  answerDayTwoPartOne,
  answerDayTwoPartTwo,
  findLetterFreq,
  isValid,
  isValidPartTwo,
  transform,
  transformPartTwo,
} from ".";

describe("day two puzzle, part one", () => {
  const letters = { a: 1, b: 1, c: 1, d: 1, e: 1 };
  const input = ["1-3 a: abcde", "1-3 b: cdefg", "2-9 c: ccccccccc"];

  it("finds the number of passwords that are correct", () => {
    expect(answerDayTwoPartOne(input)).toBe(2);
  });

  it("can find the frequency of letters in a string", () => {
    expect(findLetterFreq("abcd")).toStrictEqual({ a: 1, b: 1, c: 1, d: 1 });
    expect(findLetterFreq("abbbcdd")).toStrictEqual({ a: 1, b: 3, c: 1, d: 2 });
  });
  it("can transform data", () => {
    expect(transform("1-3 a: abcde")).toStrictEqual({
      min: 1,
      max: 3,
      letter: "a",
      letterFreq: letters,
    });
  });
  it("can tell if a password is valid or not", () => {
    expect(
      isValid({
        min: 1,
        max: 3,
        letter: "a",
        letterFreq: letters,
      })
    ).toBe(true);
    expect(
      isValid({
        min: 1,
        max: 3,
        letter: "f",
        letterFreq: letters,
      })
    ).toBe(false);
  });
  it("can transform data for the second day", () => {
    expect(transformPartTwo("1-3 a: abcde")).toStrictEqual({
      firstSample: "a",
      secondSample: "c",
      letter: "a",
    });
  });
  it("can tell if the letter is at either but not both of the samples", () => {
    expect(
      isValidPartTwo({
        firstSample: "a",
        secondSample: "c",
        letter: "a",
      })
    ).toBe(true);
    expect(
      isValidPartTwo({
        firstSample: "a",
        secondSample: "a",
        letter: "a",
      })
    ).toBe(false);
    expect(
      isValidPartTwo({
        firstSample: "c",
        secondSample: "c",
        letter: "a",
      })
    ).toBe(false);
  });
  it("finds the number of passwords that are correct", () => {
    expect(answerDayTwoPartTwo(input)).toBe(1);
  });
});
