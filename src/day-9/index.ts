import puzzleInputDay9 from "./input";

export const sumFriendYouAre = (input: number[], target: number): boolean => {
  for (let i = 0; i < input.length; i += 1) {
    for (let j = i + 1; j < input.length; j += 1) {
      const numOne = input[i];
      const numTwo = input[j];
      if (numOne + numTwo === target && numOne !== numTwo) {
        return true;
      }
    }
  }
  return false;
};

export const findTheUnsum = (input: number[], preamble: number): number => {
  for (let i = 0; i < input.length - preamble; i += 1) {
    const preambleNums = input.slice(i, preamble + i);
    const currentNum = input[i + preamble];
    if (!sumFriendYouAre(preambleNums, currentNum)) {
      return currentNum;
    }
  }
  return 0;
};

export const findSumFriends = (input: number[], target: number): number[] => {
  const sumFriends = [];
  let trialSum = 0;
  for (const num of input) {
    sumFriends.push(num);
    trialSum += num;
    if (trialSum === target) {
      return sumFriends;
    }
    if (trialSum > target) {
      break;
    }
  }
  return findSumFriends(input.slice(1), target);
};

export const findAnswerD9P2 = (input: number[], preamble: number): number => {
  const unsummedNumber = findTheUnsum(input, preamble);
  const sumFriends = findSumFriends(input, unsummedNumber).sort(
    (a, b) => a - b
  );
  const first = sumFriends[0];
  const last = sumFriends[sumFriends.length - 1];
  return first + last;
};
