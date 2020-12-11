/*
charging outlet produces the wrong number of jolts;
I have joltage adapters in my bag
Each joltage adapter is rated for a specific output joltage
Any adapter can take an input 1, 2, or 3 lower than its rating and still produce its rated output joltage

device has built-in joltage adapter rated for 3 jolts higher than the highest rated adapter in my bag

If my adapter list were [3, 6, 9 ], my devices built-in adapter would be rated for 12 jolts


outlet <<< joltage adapter <<< my device's joltage adapter

the outlet near my seat has an effective joltage rating of 0

I'm going to test all of my adapters

If I use every adapter in my bag at once, what is the distribution of joltage differences between the charging outlet, the adapters, and my device

I have adapters with the following ratings:

16
10
15
5
1
11
7
19
6
12
4

With these adapters, my device's built-in joltage adapter would be rated for 19 + 3 == 22 jolts, 3 higher than the highest rated adapter

Adapters can only connect to a source 1, 2, or 3 lower than them, in order to use every adapter, would have to choose them like .....

1 (difference of 1 jolt b/t adapter and outlet)
4 (difference of 3 b/t adapter and prev adapter)
5 (difference of 1 b/t adapter and prev adapter)
6 (difference of 1 b/t adapter and prev adapter)
7 (difference of 1 b/t adapter and prev adapter)
10 (difference of 3 b/t adapter and prev adapter)
11 (difference of 1 b/t adapter and prev adapter)
12 (difference of 1 b/t adapter and prev adapter)
15 (difference of 3 b/t adapter and prev adapter)
16 (difference of 1 b/t adapter and prev adapter)
19 (difference of 3 b/t adapter and prev adapter)
22 3 higher b/c my device's rating is always 3 higher

In this example, using every adapter,there are 7 differences of 1 jolt, and 5 differences of 3 jolts

Find a chain that that uses all of your adapters and count the joltage differences between the charging outlet, the adapters,and your device. what is the number of 1 jolt differences multiplied by 3 jolt differences.

what are the possible ways that you can do the operation of (take two consecutive differences, add them together and have everything in the list be less than or equal to three)

what are the possible combinations if I remove this item, and if I don't

number * number


---- find the places where the dominos don't fall
----

[1]


2 arrays are equivalent to each other if one could be formed from the other by adding two consequitive elements

or if there is another array that is equivalent to both of them

d is a descendent of a if either of the following two conditions are true:
--- you can form d from a by replacing any two consequtive items in a with their sum
--- if there is an intermediate array b, such that b is a descendent of a, and d is a descendent of b

concept of validity ---
  -- only valid if it's one, two, or three

when you build your descendents array, how many valid descendencts does it have


*/

import puzzleInputDay10 from "./input";

export const makeVoltages = (
  input: number[],
  outlet: number,
  myDevice: number
): number[] => {
  const sorted = input.sort((a, b) => a - b);
  const maxVol = Math.max(...sorted);
  return [outlet, ...sorted, maxVol + myDevice];
};

export const findDifferences = (input: number[]): number[] => {
  const returnVal = [];
  for (let i = 0; i < input.length - 1; i += 1) {
    const numOne = input[i];
    const numTwo = input[i + 1];
    returnVal.push(numTwo - numOne);
  }
  return returnVal;
};

export const findInstances = (input: number[], target: number): number => {
  return input.filter((num) => num === target).length;
};

export const day10Part1 = (
  input: number[],
  outlet = 0,
  myDevice = 3
): number => {
  const vltgz = makeVoltages(input, outlet, myDevice);
  const diffs = findDifferences(vltgz);
  const threes = findInstances(diffs, 3);
  const ones = findInstances(diffs, 1);
  return ones * threes;
};

export const day10Part2 = (
  input: number[],
  outlet = 0,
  myDevice = 3
): number => {
  const diffs = findDifferences(input);
  return 0;
};

export class Descendor {
  constructor(input: number[]) {}
}

/*

Start with first element of the input, which is the difference of the voltages

add the first element and the second element

is it greater than 4?

If it is not, then congrats, you have a valid descendent
+ 1

it should brand at each one

list of valid descendents, if I have combined, or not combined


Borders:
Two twos in a row
Any threes

Could divide input into groups between borders

[1, 1, 1, 3, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1]

[1, 1, 1] * [1, 1, 1, 2] * [2, 1, 1, 1, 1, 1]

// make descendent
// findValidDescendents()
    -- for each item in the array
      -- try adding two together
          --

*/
