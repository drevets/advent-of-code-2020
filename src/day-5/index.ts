import puzzleInputDayFive from "./input";

export const bisect = (input: string, range: number[]): number => {
  const upperHalves = "BR";
  const currentEl = input[0];
  const [lowerBound, upperBound] = range;
  const difference = upperBound - lowerBound;
  const lowerDifference = Math.floor(difference / 2);
  const upperDifference = Math.ceil(difference / 2);
  const lowerMax = lowerBound + lowerDifference;
  const higherMax = lowerBound + upperDifference;
  if (input.length === 1) {
    if (upperHalves.includes(currentEl)) {
      return range[1];
    }
    return range[0];
  }
  if (upperHalves.includes(currentEl)) {
    return bisect(input.slice(1), [higherMax, upperBound]);
  }

  return bisect(input.slice(1), [lowerBound, lowerMax]);
};

export const toBinary = (input: string): number => {
  const upperHalves = "BR";
  const toBin = input
    .split("")
    .map((el) => (upperHalves.includes(el) ? 1 : 0))
    .join("");
  return parseInt(toBin, 2);
};

export const findSeatId = (input: string): number => {
  const row = toBinary(input.slice(0, 7));
  const column = toBinary(input.slice(7, 10));
  return row * 8 + column;
};

export const findAnswerPartOne = (input: string[]): number => {
  const seatsIds = input.map((bin) => findSeatId(bin));
  return Math.max(...seatsIds);
};

export const findMySeat = (input: Set<number>, max: number): number => {
  const range = [...Array(max).keys()];
  for (let i = max; i > 0; i -= 1) {
    const next = range[i - 1];
    if (!input.has(next)) {
      return next;
    }
  }
};

export const findAnswerPartTwo = (input: string[]): number => {
  const seatsIds = input.map((bin) => findSeatId(bin));
  const max = Math.max(...seatsIds);
  return findMySeat(new Set(seatsIds), max);
};

// my OG answer: 624, but it's too low!!!
// console.log("ANSWER??", findAnswerPartTwo(puzzleInputDayFive));
