/*

so, I have a "map" of where trees exist on coordinates.
if there is a dot, it means it's clear, if there is a #, there is a tree
We only get a sample of the first n spaces.
The pattern repeats infinitely to the right
I start in the upper left hand corner and have a slope of 3, -1, so I go over three and down one
After I finish going through all of the rows, I want to know how many trees I have hit.

So, I'm thinking ... if I have my starting coordinates

[0,0], and I know how I move, [+3, +1],
Then I can traverse.


Open questions:
* what to do after hitting the "edge"? Recursion
* information we need about a space:
  * the coordinate, the value of that coordinate
* information we need to remember about the row:
  * the row's pattern
  *
row.repeat()

class Field(){
  grid

  traverse

  makeGrid
}

class Row(){
  row
  row coords
  repeatRow

}

A grid is an array of Row
A row is a Map

possible solution:
[Map, Map, Map, Map], starting point
Start at starting point,
traverse one by adding 3 and 1 to each coordinate
At each stopping point, find out if it's a tree or not, and add to tally
If adding to a row takes it past the end, then the line needs to repeat from the last X coordinate .... not really sure how to do this one ....

Shape of a space

[[x, y], value]

shape of a row [[[x, y], value], [[x, y], value]]

shape of a grid:

[[[[x, y], value], [[x, y], value]], [[[x, y], value], [[x, y], value]]]

the repeating will always start from the x value of the first space in the row

*/

import { Field, findAnswer, Row } from ".";

const spaceOne = [[0, 0], "."];
const spaceTwo = [[1, 0], "#"];
const spaceThree = [[2, 0], "."];
const spaceFour = [[3, 0], "#"];

const expectedValue = [spaceOne, spaceTwo];

xdescribe("Row", () => {
  it("can make a space", () => {
    const row = new Row(".", 0);
    expect(row.makeSpace(".", 0, 0)).toStrictEqual([[0, 0], "."]);
  });
  it("can make a row", () => {
    const row = new Row(".#", 0);
    //@ts-ignore
    expect(row.makeRow(".#", 0)).toStrictEqual(expectedValue);
  });
  it("can repeat itself ", () => {
    const row = new Row(".#", 0);
    row.repeat();
    //@ts-ignore
    expect(row.coordinates).toStrictEqual([
      spaceOne,
      spaceTwo,
      spaceThree,
      spaceFour,
    ]);
  });
  it("can say if coordinates are valid or not ", () => {
    const row = new Row(".#", 0);
    expect(row.checkValidCoords([4, 0])).toBe(false);
    expect(row.checkValidCoords([0, 0])).toBe(true);
  });
});

xdescribe("Grid", () => {
  it("can make a grid", () => {
    const field = new Field([".#", "#."]);
    const rowOne = new Row(".#", 0);
    const rowTwo = new Row("#.", 1);
    expect(field.grid).toStrictEqual([rowOne, rowTwo]);
  });

  it("can traverse a row and mark coorectly if there is a tree", () => {
    const field = new Field([".#", "#."], [1, 1]);
    field.traverse();
    expect(field.currentLocation).toStrictEqual([1, 1]);
    expect(field.treesHit).toBe(0);
  });
  it("can traverse past the end of a row", () => {
    const field = new Field([".#", "#."], [3, 1]);
    field.traverse();
    expect(field.treesHit).toBe(0);
  });
  it("can traverse past the end of a row", () => {
    const field = new Field([".#", "#."], [2, 1]);
    field.traverse();
    expect(field.treesHit).toBe(1);
  });
});

const testInput = [
  "..##.......",
  "#...#...#..",
  ".#....#..#.",
  "..#.#...#.#",
  ".#...##..#.",
  "..#.##.....",
  ".#.#.#....#",
  ".#........#",
  "#.##...#...",
  "#...##....#",
  ".#..#...#.#",
];

describe("findAnswer", () => {
  it("can find the answer in the test input", () => {
    expect(findAnswer(testInput)).toBe(7);
  });
});
