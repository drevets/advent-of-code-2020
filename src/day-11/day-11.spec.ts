import { day11Part1, Seater } from ".";

describe("day11Part1", () => {
  it("finds the right answer", () => {
    const input = [
      "L.LL.LL.LL",
      "LLLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLLL",
      "L.LLLLLL.L",
      "L.LLLLL.LL",
    ];

    expect(day11Part1(input)).toBe(37);
  });
  it("can find the right arrangment after oen seating", () => {
    const initial = [
      "L.LL.LL.LL",
      "LLLLLLL.LL",
      "L.L.L..L..",
      "LLLL.LL.LL",
      "L.LL.LL.LL",
      "L.LLLLL.LL",
      "..L.L.....",
      "LLLLLLLLLL",
      "L.LLLLLL.L",
      "L.LLLLL.LL",
    ];
    const afterFirst = [
      "#.##.##.##",
      "#######.##",
      "#.#.#..#..",
      "####.##.##",
      "#.##.##.##",
      "#.#####.##",
      "..#.#.....",
      "##########",
      "#.######.#",
      "#.#####.##",
    ];

    const afterSecond = [
      "#.LL.L#.##",
      "#LLLLLL.L#",
      "L.L.L..L..",
      "#LLL.LL.L#",
      "#.LL.LL.LL",
      "#.LLLL#.##",
      "..L.L.....",
      "#LLLLLLLL#",
      "#.LLLLLL.L",
      "#.#LLLL.##",
    ];

    const afterThird = [
      "#.##.L#.##",
      "#L###LL.L#",
      "L.#.#..#..",
      "#L##.##.L#",
      "#.##.LL.LL",
      "#.###L#.##",
      "..#.#.....",
      "#L######L#",
      "#.LL###L.L",
      "#.#L###.##",
    ];
    const seater = new Seater(initial);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual(afterFirst);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual(afterSecond);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual(afterThird);
  });
});

describe("problem input", () => {
  it("can show me where the bug is", () => {
    const afterSecond = [
      "#.LL.L#.##",
      "#LLLLLL.L#",
      "L.L.L..L..",
      "#LLL.LL.L#",
      "#.LL.LL.LL",
      "#.LLLL#.##",
      "..L.L.....",
      "#LLLLLLLL#",
      "#.LLLLLL.L",
      "#.#LLLL.##",
    ];
    const afterThird = [
      "#.##.L#.##",
      "#L###LL.L#",
      "L.#.#..#..",
      "#L##.##.L#",
      "#.##.LL.LL",
      "#.###L#.##",
      "..#.#.....",
      "#L######L#",
      "#.LL###L.L",
      "#.#L###.##",
    ];
    const seater = new Seater(afterSecond);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual(afterThird);
  });
});

describe("Seater", () => {
  it("can count occupied seats", () => {
    const seater = new Seater([]);
    expect(seater.countOccupiedSeats()).toBe(0);
    const seater2 = new Seater(["#"]);
    expect(seater2.countOccupiedSeats()).toBe(1);
    const seater3 = new Seater(["#", "L"]);
    expect(seater3.countOccupiedSeats()).toBe(1);
    const seater4 = new Seater(["#.", "L"]);
    expect(seater4.countOccupiedSeats()).toBe(1);
  });
  it("can seat no people", () => {
    const seater = new Seater([]);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual([]);
  });
  it("can seat no people in a floor space", () => {
    const seater = new Seater(["."]);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual(["."]);
    expect(seater.getDidSeatCountChange()).toBe(false);
  });
  it("can seat one person in a seat", () => {
    const seater = new Seater(["L"]);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual(["#"]);
    expect(seater.getDidSeatCountChange()).toBe(true);
  });
  it("can deal with two seats", () => {
    const seater = new Seater(["LL"]);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual(["##"]);
    expect(seater.getDidSeatCountChange()).toBe(true);
  });
});

describe("next part of seater", () => {
  it("can deal with three rows of three seats", () => {
    const seater = new Seater(["###", "###", "###"]);
    seater.seat();
    expect(seater.getCurrentSeats()).toStrictEqual(["#L#", "LLL", "#L#"]);
    expect(seater.getDidSeatCountChange()).toBe(true);
  });
});
