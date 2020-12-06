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

import { findAnswerPartOne, ProcessBatch, ProcessPassports } from ".";

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
        "ecl:gry pid:860033327 eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
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
        "ecl:gry eyr:2020 hcl:#fffffd byr:1937 iyr:2017 cid:147 hgt:183cm"
      )
    ).toBeUndefined();
  });
});
