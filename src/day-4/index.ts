import puzzleInputDayFour from "./input";

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
  private validPassports = 0;

  private passports: { [index: string]: string }[];

  private requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  constructor(input: string[]) {
    this.passports = this.processPassports(input);
  }

  checkRequiredKeys(obj: { [index: string]: string }): void {
    const keys = Object.keys(obj);
    this.requiredKeys.forEach((key) => {
      if (!keys.includes(key)) {
        throw new Error(`missing required key, ${key}`);
      }
    });
  }

  public processPassports(input: string[]): { [index: string]: string }[] {
    return input.map((passport) => this.passportCreate(passport));
  }

  public parseKV = (input: string): { [index: string]: string } => {
    const [key, value] = input.split(":");
    return { [key]: value };
  };

  public passportCreate = (
    input: string
  ): { [index: string]: string } | undefined => {
    const parsedPassport = input
      .split(" ")
      .map((kv) => this.parseKV(kv))
      .reduce((acc, curr) => ({ ...curr, ...acc }), {});

    try {
      this.checkRequiredKeys(parsedPassport);
      return parsedPassport;
    } catch (e) {
      console.log("invalid passport");
    }
    return undefined;
  };

  public findValidPassports(): number {
    return this.passports.filter((passport) => !!passport).length;
  }
}

export const findAnswerPartOne = (input: string): number => {
  const batcher = new ProcessBatch(input);
  const processedBatch = batcher.getPassports();

  const passporter = new ProcessPassports(processedBatch);
  return passporter.findValidPassports();
};

console.log("ANSWER?: ", findAnswerPartOne(puzzleInputDayFour));
