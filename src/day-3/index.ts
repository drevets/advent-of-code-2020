export class Row {
  public coordinates: [number[], string][];

  constructor(xValues: string, yValue: number) {
    this.coordinates = this.makeRow(xValues, yValue);
  }

  makeRow(spaces: string, yValue: number): [number[], string][] {
    return spaces
      .split("")
      .map((space, index) => this.makeSpace(space, index, yValue));
  }

  makeSpace(input: string, xValue: number, yValue: number): [number[], string] {
    return [[xValue, yValue], input];
  }

  repeat(): void {
    const lastValue = this.coordinates.length;
    const repeatValues = this.coordinates.map((space, index) => {
      const [coord, value] = space;
      const [x, y] = coord;
      return [[lastValue + index, y], value];
    });
    const repeated = this.coordinates.concat(repeatValues);
    this.coordinates = repeated;
  }

  checkValidCoords(coords: number[]): boolean {
    const [nextX, nextY] = coords;
    return !!this.coordinates.filter((space) => {
      const [thisSpace, _] = space;
      const [x, y] = thisSpace;
      return x === nextX && y === nextY;
    }).length;
  }

  getSpace(coords: number[]): [number[], string][] {
    const space = this.coordinates.filter((s) => {
      const [thisSpace, _] = s;
      const [x, y] = thisSpace;
      return x === coords[0] && y === coords[1];
    });
    return (space[0] as unknown) as [number[], string][];
  }
}

export class Field {
  public grid: Row[];

  private slope: number[];

  public treesHit: number;

  public currentLocation: number[];

  constructor(input: string[], slope = [3, 1], currentLocation = [0, 0]) {
    this.makeGrid(input);
    this.slope = slope;
    this.currentLocation = currentLocation;
    this.treesHit = 0;
  }

  makeGrid(input: string[]): void {
    this.grid = input.map((row, index) => new Row(row, index));
  }

  traverse(): number {
    const [x, y] = this.currentLocation;
    const [xSlope, ySlope] = this.slope;
    const nextLocation = [x + xSlope, y + ySlope];
    const rowToTry = this.grid[y + ySlope];
    if (rowToTry.checkValidCoords(nextLocation)) {
      this.currentLocation = nextLocation;
      const nextLocationValue = rowToTry.getSpace(nextLocation);
      if (nextLocationValue[1] === "#") {
        this.treesHit += 1;
      }
      return y;
    } else {
      console.log("going to try again", y);
      rowToTry.repeat();
      this.traverse();
    }
  }

  traverseAll(): number {
    let [x, y] = this.currentLocation;

    while (y < this.grid.length) {
      y = this.traverse();
    }

    return this.treesHit;
  }
}

export const findAnswer = (input: string[]): number => {
  const grid = new Field(input);
  return grid.traverseAll();
};
