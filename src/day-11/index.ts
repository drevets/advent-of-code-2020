/*

Each position is either floor, empty seat, or occupied seat
Floor = .
Empty seat = L
occupied seat = #

All decisions are based on the number of occupied seats adjacent to a given seat (one of the 8 positions surrounding the seat)

Otherwise, the seat's state does not change

Floors (.) don't change,seats don't move, and nobody sits on the floor

After 5 rounds, chaos stabilizes and no more seats change
Once people stop moving around, you cound 37 occupied seats

So, for your puzzle input, after your chaos stabilizes, how many seats are occupied??


could have a class = Seater {}
Takes in initial seating arrangement
Method called seatPeople(), which follows rules
Method called countOccupiedSeats()
Property called didOccupiedSeatNumberChangeLastSeating?


seat people is obviously the interesting thing here ...

For each valid seat (either L or #) with coord [x, y]
check

[x - 1, y - 1] [x, y - 1] [x + 1, y - 1]
  [x - 1, y] [x, y] [x + 1, y]
[x - 1, y + 1] [x, y + 1], [x + 1, y + 1]

if any of these are invalid, don't check them
if any of these are ., don't check them


if the seat is empty and there are no occupied seats adjacent to it, the seat becomes occupied  (L to #)

if a seat is occupied and four or more seats adjacent to it are also occupied, the seat becomes empty

going back and forth between 20 intermediates. Something is wrong with my rulezzzzz enforcement. Chould check intermediate states ....

*/

export class Seater {
  private initialSeats: string[];

  private currentSeats: string[];

  private didSeatedCountChange = false;

  private currentlyOccupiedSeats = 0;

  constructor(input: string[]) {
    this.initialSeats = input;
    this.currentSeats = input;
  }

  getCurrentSeats(): string[] {
    return this.currentSeats;
  }

  setCurrentSeats(seats: string[]): void {
    this.currentSeats = seats;
  }

  setDidSeatCountChange(didItChange: boolean): void {
    this.didSeatedCountChange = didItChange;
  }

  getDidSeatCountChange(): boolean {
    return this.didSeatedCountChange;
  }

  setCurrentlySeatedCount(seats: number): void {
    this.currentlyOccupiedSeats = seats;
  }

  getCurrentlySeatedCount(): number {
    return this.currentlyOccupiedSeats;
  }

  countOccupiedSeats(): number {
    return this.currentSeats.reduce((total, row) => {
      const seats = row.split("");
      const occupied = seats.filter((s) => s === "#").length;
      return total + occupied;
    }, 0);
  }

  seatSeats(): number {
    const didSeatsChange = this.seat();
    // console.log("didSeatschnage", didSeatsChange);
    if (!didSeatsChange) {
      // console.log("seats did not change", didSeatsChange);
      return this.getCurrentlySeatedCount();
    }
    // console.log("calling seat again");
    this.seatSeats();
  }

  seat(): boolean {
    const occupiedSeatCountBefore = this.getCurrentlySeatedCount();
    console.log("occupiedSeatCountBefore", occupiedSeatCountBefore);
    const newSeatArrangement = this.currentSeats.map((row, yValue, allSeats) =>
      this.seatRow(row, yValue, allSeats)
    );
    this.setCurrentSeats(newSeatArrangement);
    const occupiedSeatCountAfter = this.countOccupiedSeats();
    this.setCurrentlySeatedCount(occupiedSeatCountAfter);
    this.setDidSeatCountChange(
      occupiedSeatCountBefore !== occupiedSeatCountAfter
    );
    return occupiedSeatCountBefore !== occupiedSeatCountAfter;
  }

  seatRow(row: string, yValue: number, allSeats: string[]): string {
    const seats = row.split("");
    return seats
      .map((seat, xValue) => this.fillSeat(seat, xValue, yValue, allSeats))
      .join("");
  }

  fillSeat(
    seat: string,
    xValue: number,
    yValue: number,
    allSeats: string[]
  ): string {
    if (seat === ".") {
      return seat;
    }
    let adjacentFilledSeats = 0;

    const indicesToCheck = this.findIndicesToCheck(xValue, yValue, allSeats);

    for (const coords of indicesToCheck) {
      const [x, y] = coords;
      if (allSeats[y][x] === "#") {
        adjacentFilledSeats += 1;
      }
    }

    if (adjacentFilledSeats >= 4) {
      return "L";
    }
    return "#";
  }

  findIndicesToCheck = (
    xValue: number,
    yValue: number,
    allSeats: string[]
  ): [number[]] => {
    const possibleXs = [xValue - 1, xValue, xValue + 1];
    const possibleYs = [yValue - 1, yValue, yValue + 1];
    const toCheck = [];
    for (const possibleX of possibleXs) {
      for (const possibleY of possibleYs) {
        const row = allSeats[possibleY];
        if (row && row[possibleX]) {
          toCheck.push([possibleX, possibleY]);
        }
      }
    }
    return toCheck.filter((coords) => {
      const [x, y] = coords;
      if (x == xValue) {
        if (y == yValue) {
          return false;
        }
      }
      return true;
    });
  };
}

export const day11Part1 = (input: string[]): number => {
  const seater = new Seater(input);
  const numOccupied = seater.seatSeats();
  return numOccupied;
};
