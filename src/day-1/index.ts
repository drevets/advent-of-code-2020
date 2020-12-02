// puzzle quest day 1, part 1: find the two entries that sum to 2020 and then multiply those two numbers together

import puzzleInput from "./input";

// puzzle quest day 1, part 2: find 3 numbers that sum to 2020 and then multiply the numbers together

export const findTwoNumbersForSum = (
  input: number[],
  target: number
): number[] => {
  let numberOne: number = null;
  let numberTwo: number = null;

  for (let outerIndex = 0; outerIndex < input.length - 1; outerIndex += 1) {
    numberOne = input[outerIndex];
    for (
      let innerIndex = outerIndex + 1;
      innerIndex < input.length;
      innerIndex += 1
    ) {
      numberTwo = input[innerIndex];
      if (numberTwo + numberOne === target) {
        return [numberOne, numberTwo];
      }
    }
  }
};

export const findThreeNumbersForSum = (
  input: number[],
  target: number
): number[] => {
  let numberOne: number = null;
  let numberTwo: number = null;
  let numberThree: number = null;

  for (let outerIndex = 0; outerIndex < input.length - 1; outerIndex += 1) {
    numberOne = input[outerIndex];
    for (
      let innerIndex = outerIndex + 1;
      innerIndex < input.length;
      innerIndex += 1
    ) {
      numberTwo = input[innerIndex];
      for (
        let veryInnerIndex = innerIndex + 1;
        veryInnerIndex < input.length;
        veryInnerIndex += 1
      ) {
        numberThree = input[veryInnerIndex];
        if (numberOne + numberTwo + numberThree === target) {
          return [numberOne, numberTwo, numberThree];
        }
      }
    }
  }

  return [5, 6, 7];
};

const findAnswer = (input: number[]): number => {
  const [one, two] = findTwoNumbersForSum(input, 2020);
  return one * two;
};

export const findPartTwoAnswer = (input: number[]): number => {
  const [one, two, three] = findThreeNumbersForSum(input, 2020);
  return one * two * three;
};

export const findSetsOfTwo = (input: number[]): Set<number[]> => {
  const mainSet: Set<number[]> = new Set();
  let numberOne: number = null;
  let numberTwo: number = null;
  for (let outerIndex = 0; outerIndex < input.length - 1; outerIndex += 1) {
    numberOne = input[outerIndex];
    for (
      let innerIndex = outerIndex + 1;
      innerIndex < input.length;
      innerIndex += 1
    ) {
      numberTwo = input[innerIndex];
      mainSet.add([numberOne, numberTwo]);
    }
  }
  return mainSet;
};

export const removeTooLarge = (
  input: Set<number[]>,
  target: number
): Set<number[]> => {
  for (const pair of input) {
    const [numOne, numTwo] = pair;
    if (numOne + numTwo > target) {
      input.delete(pair);
    }
  }
  return input;
};

export const makeSetsOfThree = (
  input: number[],
  pairs: Set<number[]>
): number[] => {
  let num: number = null;
  for (let i = 0; i < input.length; i += 1) {
    num = input[i];
    for (const pair of pairs) {
      if (!pair.includes(num)) {
        const [one, two] = pair;
        if (one + two + num === 2020) {
          return [one, two, num];
        }
      }
    }
  }
};

const findThreeNumbersButSmarter = (
  input: number[],
  target = 2020
): number[] => {
  const pairs = findSetsOfTwo(input);
  const remainingPairs = removeTooLarge(pairs, target);
  return makeSetsOfThree(input, remainingPairs);
};

export const findPartTwoAnswerButSmarter = (input: number[]): number => {
  const [one, two, three] = findThreeNumbersButSmarter(input, 2020);
  findThreeNumbersButSmarter(input, 2020);
  return one * two * three;
};

export default findAnswer;
