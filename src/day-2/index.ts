import puzzleInput from "./input";

interface PasswordData {
  min: number;
  max: number;
  letter: string;
  letterFreq: { [index: string]: number };
}

interface PasswordDataPartTwo {
  firstSample: string;
  secondSample: string;
  letter: string;
}

export const findLetterFreq = (input: string): { [index: string]: number } => {
  const letters = input.split("");
  return letters.reduce((acc, curr) => {
    if (acc[curr]) {
      acc[curr] += 1;
      return acc;
    }
    acc[curr] = 1;
    return acc;
  }, {});
};

const findRange = (input: string): number[] => {
  const [low, high] = input.split("-");
  return [+low, +high];
};

export const transform = (input: string): PasswordData => {
  const [range, letterColon, password] = input.split(" ");
  const [min, max] = findRange(range);
  const letter = letterColon[0];
  return { min, max, letter, letterFreq: findLetterFreq(password) };
};

export const transformPartTwo = (input: string): PasswordDataPartTwo => {
  const [range, letterColon, password] = input.split(" ");
  const [first, second] = findRange(range);
  const letter = letterColon[0];
  return {
    firstSample: password[first - 1],
    secondSample: password[second - 1],
    letter,
  };
};

export const isValid = ({
  min,
  max,
  letter,
  letterFreq,
}: PasswordData): boolean => {
  const thisLetterFreq = letterFreq[letter];
  if (!thisLetterFreq) {
    return false;
  }
  if (thisLetterFreq < min || thisLetterFreq > max) {
    return false;
  }
  return true;
};

export const isValidPartTwo = ({
  letter,
  firstSample,
  secondSample,
}: PasswordDataPartTwo): boolean => {
  const isSameAsFirstSample = letter === firstSample;
  const isSameAsSecondSample = letter === secondSample;
  if (isSameAsFirstSample && isSameAsSecondSample) {
    return false;
  }
  if (!isSameAsFirstSample && !isSameAsSecondSample) {
    return false;
  }
  return true;
};

export const answerDayTwoPartOne = (input: string[]): number => {
  const passwordData = input.map((pwd) => transform(pwd));
  const validPwds = passwordData.filter((pwd) => isValid(pwd));
  return validPwds.length;
};

export const answerDayTwoPartTwo = (input: string[]): number => {
  const passwordData = input.map((pwd) => transformPartTwo(pwd));
  const validPwds = passwordData.filter((pwd) => isValidPartTwo(pwd));
  return validPwds.length;
};
