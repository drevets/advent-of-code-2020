import puzzleInputDayTwo from "./input";

export class Field {
  private terrain: string[];

  private length: number;

  public currentLocation: number[] = [0, 0];

  private slope: number[];

  public treesHit = 0;

  constructor(input: string[], slope: number[]) {
    this.terrain = input;
    this.length = input[0].length;
    this.slope = slope;
  }

  public isTree(x: number, y: number): boolean {
    return this.spaceIsTree(this.terrain[y][x % this.length]);
  }

  private spaceIsTree(input: string) {
    return input === "#";
  }

  public traverseOne(): void {
    const [x, y] = this.currentLocation;
    const [xSlope, ySlope] = this.slope;
    this.currentLocation = [x + xSlope, y + ySlope];
  }

  public traverse(): void {
    const [xSlope, ySlope] = this.slope;
    const endPoint = Math.round((this.terrain.length - 1) / ySlope);
    for (let i = 0; i < endPoint; i += 1) {
      this.traverseOne();
      const [x, y] = this.currentLocation;
      if (this.isTree(x, y)) {
        this.treesHit += 1;
      }
    }
  }
}

export const findPartOneAnswer = (input: string[], slope = [3, 1]): number => {
  const field = new Field(input, slope);
  field.traverse();
  return field.treesHit;
};

export const findPartTwoAnswer = (input: string[]): number => {
  const slopes = [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2],
  ];
  const treesHit = slopes.map((slope) => findPartOneAnswer(input, slope));
  return treesHit.reduce((prev, curr) => prev * curr, 1);
};
