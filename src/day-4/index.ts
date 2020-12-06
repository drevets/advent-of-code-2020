import puzzleInputDayFour from "./input";

export class Validator {
  byr(input: string): boolean {
    const parsed = parseInt(input, 10);
    return parsed >= 1920 && parsed <= 2002;
  }

  iyr(input: string): boolean {
    const parsed = parseInt(input, 10);
    return parsed >= 2010 && parsed <= 2020;
  }

  eyr(input: string): boolean {
    const parsed = parseInt(input, 10);
    return parsed >= 2020 && parsed <= 2030;
  }

  hgt(input: string): boolean {
    const split = input.split("c");
    if (split.length === 2) {
      const [num, unit] = split;
      if (unit !== "m") {
        return false;
      }
      const parsedNum = parseInt(num, 10);
      return parsedNum >= 150 && parsedNum <= 193;
    }
    const splitOnInches = input.split("in");
    if (splitOnInches.length < 2) {
      return false;
    }
    const [num, rest] = splitOnInches;
    const parsed = parseInt(num, 10);
    return parsed >= 59 && parsed <= 76;
  }

  hcl(input: string): boolean {
    const allowed = "abcdef0123456789";
    const splitted = input.split("#");
    if (splitted.length < 2) {
      return false;
    }
    const [empty, color] = splitted;
    if (color.length < 6) {
      return false;
    }
    for (const letter of color) {
      if (!allowed.includes(letter)) {
        return false;
      }
    }
    return true;
  }

  ecl(input: string): boolean {
    return ["amb", "blu", "brn", "gry", "grn", "hzl", "oth"].includes(input);
  }

  pid(input: string): boolean {
    return input.length === 9;
  }
}

export class ProcessBatch {
  private passports: string[];

  constructor(input: string) {
    this.passports = this.makePassports(input);
  }

  private makePassports(input: string): string[] {
    let passport = "";
    const passports = [];
    const batch = input.split("\n");
    for (let i = 0; i < batch.length; i += 1) {
      const snippet = batch[i];
      if (snippet.length) {
        passport += snippet;
        passport += " ";
      } else {
        passports.push(passport.trim());
        passport = "";
      }
      if (i === batch.length - 1) {
        passports.push(passport.trim());
      }
    }
    return passports;
  }

  getPassports(): string[] {
    return this.passports;
  }
}

export class ProcessPassports {
  private passports: { [index: string]: string }[];

  private requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  constructor(input: string[], shouldValidate = false) {
    this.passports = this.processPassports(input, shouldValidate);
  }

  checkRequiredKeys(
    obj: { [index: string]: string },
    shouldValidate: boolean
  ): void {
    const keys = Object.keys(obj);
    this.requiredKeys.forEach((key) => {
      if (!keys.includes(key)) {
        throw new Error(`missing required key, ${key}`);
      }
      if (shouldValidate) {
        const validor = new Validator();
        const validatorFunc = validor[key];
        const toValidate = obj[key];
        if (!validatorFunc(toValidate)) {
          throw new Error(`key did not pass validation`);
        }
      }
    });
  }

  public processPassports(
    input: string[],
    shouldValidate: boolean
  ): { [index: string]: string }[] {
    return input
      .map((passport) => this.passportCreate(passport, shouldValidate))
      .filter((passport) => !!passport);
  }

  public parseKV = (input: string): { [index: string]: string } => {
    const [key, value] = input.split(":");
    return { [key]: value };
  };

  public passportCreate = (
    input: string,
    shouldValidate: boolean
  ): { [index: string]: string } | undefined => {
    const parsedPassport = input
      .split(" ")
      .map((kv) => this.parseKV(kv))
      .reduce((acc, curr) => ({ ...curr, ...acc }), {});

    try {
      this.checkRequiredKeys(parsedPassport, shouldValidate);
      return parsedPassport;
    } catch (e) {
      return undefined;
    }
  };

  public findValidPassports(): number {
    return this.passports.length;
  }
}

export const findAnswerPartOne = (input: string): number => {
  const batcher = new ProcessBatch(input);
  const processedBatch = batcher.getPassports();

  const passporter = new ProcessPassports(processedBatch);
  return passporter.findValidPassports();
};

export const findAnswerPartTwo = (input: string): number => {
  const batcher = new ProcessBatch(input);
  const processedBatch = batcher.getPassports();

  const passporter = new ProcessPassports(processedBatch, true);
  return passporter.findValidPassports();
};
