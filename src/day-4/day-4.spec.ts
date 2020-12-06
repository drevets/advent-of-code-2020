/*

scanners are having trouble detecting which passports have all of the required fields

expected fields are as follows:

byr (Birth Year)
iyr (Issue Year)
eyr (Expiration Year)
hgt (Height)
hcl (Hair Color)
ecl (Eye Color)
pid (Passport ID)
cid (Country ID)

each passport is represented as a sequence of key:value pairs separated by spaces OR newlines passports are separated by blank lines

four example passports:

ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in


The first passport is valid. It has all reuqired 8 fields.
The second passport is invlaid. it is missing hgt;

the third passport is only missing cid, which is OK

Fourth passport is missing cid and and byr, so it's not ok

So:
* passports are separated by blank new lines.
* passports themselves consist of key:value pairs that are separated either by spaces OR by newlines (which are not blank)
* passports must have:
  byr (Birth Year)
  iyr (Issue Year)
  eyr (Expiration Year)
  hgt (Height)
  hcl (Hair Color)
  ecl (Eye Color)
  pid (Passport ID)

* cid is optional


so,
- i'll need to take this puzzle input and be able to successfully divide it into strings that represent passports
- then, I'll need to go through each passport and parse that into something (object, array?) that tells me what fields exist

Approach:
* PassportProcessor
* Tells me how many valid passports there are
* converts batches into passports
* Converts passportStrings into Passports
  * throws if there isn't a required field but continues processing the batch
*/

import {
  findAnswerPartOne,
  findAnswerPartTwo,
  ProcessBatch,
  ProcessPassports,
  Validator,
} from ".";

const testInput = `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`;

const testPassports = [
  "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm",
  "iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884 hcl:#cfa07d byr:1929",
  "hcl:#ae17e1 iyr:2013 eyr:2024 ecl:brn pid:760753108 byr:1931 hgt:179cm",
  "hcl:#cfa07d eyr:2025 pid:166559648 iyr:2011 ecl:brn hgt:59in",
];

const sample = `one:two three:four
five:six

seven:eight
nine:ten
eleven:twelve`;

const samplePassports = [
  "one:two three:four five:six",
  "seven:eight nine:ten eleven:twelve",
];

describe("findAnswerPartOne", () => {
  it("finds the right answer", () => {
    expect(findAnswerPartOne(testInput)).toBe(2);
  });
});

describe("ProcessBatch", () => {
  it("can process a batch passports", () => {
    const processor = new ProcessBatch(sample);
    expect(processor.getPassports()).toStrictEqual(samplePassports);
    const advancedProcessor = new ProcessBatch(testInput);
    expect(advancedProcessor.getPassports()).toStrictEqual(testPassports);
  });
});

describe("ProcessPassports", () => {
  it("can parse one KV", () => {
    const passportProcessor = new ProcessPassports(samplePassports);
    expect(passportProcessor.parseKV("five:six")).toStrictEqual({
      five: "six",
    });
  });
  it("can parse a valid passport", () => {
    const passportProcessor = new ProcessPassports(samplePassports);
    expect(
      passportProcessor.passportCreate(
        "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm",
        false
      )
    ).toStrictEqual({
      ecl: "gry",
      pid: "860033327",
      eyr: "2020",
      hcl: "#fffffd",
      byr: "1937",
      iyr: "2017",
      cid: "147",
      hgt: "183cm",
    });
  });
  it("can parse an invalid passport", () => {
    const passportProcessor = new ProcessPassports(samplePassports);
    expect(
      passportProcessor.passportCreate(
        "ecl:gry eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm",
        false
      )
    ).toBeUndefined();
  });
});

describe("Validator", () => {
  const validor = new Validator();
  it("can say if a birthyear is valid or not", () => {
    expect(validor.byr("1919")).toBe(false);
    expect(validor.byr("1920")).toBe(true);
    expect(validor.byr("2002")).toBe(true);
    expect(validor.byr("2003")).toBe(false);
  });
  it("can say if a issue date is valid or not", () => {
    expect(validor.eyr("2020")).toBe(true);
    expect(validor.eyr("2019")).toBe(false);
    expect(validor.eyr("2030")).toBe(true);
    expect(validor.eyr("2031")).toBe(false);
  });
  it("can say if a height is valid or not", () => {
    expect(validor.hgt("200cm")).toBe(false);
    expect(validor.hgt("150cm")).toBe(true);
    expect(validor.hgt("59in")).toBe(true);
    expect(validor.hgt("100in")).toBe(false);
    expect(validor.hgt("100")).toBe(false);
  });
  it("can say if a hair color is valid or not", () => {
    expect(validor.hcl("#123abc")).toBe(true);
    expect(validor.hcl("#123abz")).toBe(false);
    expect(validor.hcl("123abc")).toBe(false);
  });
  it("can say if an eye color is valid or not", () => {
    expect(validor.ecl("brn")).toBe(true);
    expect(validor.ecl("wat")).toBe(false);
  });
  it("can say if a pid is valid or not", () => {
    expect(validor.pid("000000001")).toBe(true);
    expect(validor.pid("0123456789")).toBe(false);
  });
});

describe("findAnswerPartTWo", () => {
  it("shouild get one example right", () => {
    expect(
      findAnswerPartTwo(`eyr:1972 cid:100
    hcl:#18171d ecl:amb hgt:170 pid:186cm iyr:2018 byr:1926`)
    ).toBe(0);
  });
  it("shouild get another example right", () => {
    expect(
      findAnswerPartTwo(`iyr:2019
      hcl:#602927 eyr:1967 hgt:170cm
      ecl:grn pid:012533040 byr:1946`)
    ).toBe(0);
  });
  it("shouild get a third example right", () => {
    expect(
      findAnswerPartTwo(`hcl:dab227 iyr:2012
      ecl:brn hgt:182cm pid:021572410 eyr:2020 byr:1992 cid:277`)
    ).toBe(0);
  });
  it("shouild get a fourth example right", () => {
    expect(
      findAnswerPartTwo(`hgt:59cm ecl:zzz
      eyr:2038 hcl:74454a iyr:2023
      pid:3556412378 byr:2007`)
    ).toBe(0);
  });
  it("shouild get a fifth example right", () => {
    expect(
      findAnswerPartTwo(`pid:087499704 hgt:74in ecl:grn iyr:2012 eyr:2030 byr:1980
      hcl:#623a2f`)
    ).toBe(1);
  });
});
