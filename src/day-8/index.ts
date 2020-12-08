import puzzleInputDayEight from "./input";

interface Operation {
  no: number;
  type: string;
  value: number;
}

export class Compy {
  operations: Operation[];

  processed: Set<number> = new Set([]);

  accumulator = 0;

  currentOp = 0;

  terminated = false;

  constructor(input: string[]) {
    this.setOperations(this.makeOperations(input));
  }

  makeOperations(input: string[]): Operation[] {
    return input.map((i, index) => this.makeOperation(i, index));
  }

  makeOperation(input: string, index: number): Operation {
    const [type, value] = input.split(" ");
    return { no: index, type, value: parseInt(value, 10) };
  }

  compute = (): void => {
    if (this.currentOp === this.operations.length) {
      this.terminated = true;
      return;
    }
    const currentOp = this.operations[this.currentOp];
    const shouldContinue = this.processOperation(currentOp);
    if (shouldContinue) {
      this.compute();
    }
  };

  processOperation = (o: Operation): boolean => {
    if (this.processed.has(o.no)) {
      return false;
    }
    this.processed.add(o.no);
    switch (o.type) {
      case "acc":
        this.accumulator += o.value;
        this.currentOp += 1;
        break;
      case "jmp":
        this.currentOp += o.value;
        break;
      case "nop":
        this.currentOp += 1;
        break;
      default:
        throw new Error("cannot handle this type");
    }
    return true;
  };

  setOperations(operations: Operation[]): void {
    this.operations = operations;
  }
}

export const fixCode = (o: Operation): Operation => {
  switch (o.type) {
    case "acc":
      return o;
    case "jmp":
      return { ...o, type: "nop" };
    case "nop":
      return { ...o, type: "jmp" };
    default:
      throw new Error("cannot handle this type");
  }
};

export const findAnswerDayEight = (input: string[]): number => {
  const compy = new Compy(input);
  compy.compute();
  return compy.accumulator;
};

export const findAnswerDayEightPartTwo = (input: string[]): number => {
  const compy = new Compy(input);
  const ops = compy.operations;
  for (let i = 0; i < ops.length; i += 1) {
    const copyOfOps = [...ops];
    copyOfOps[i] = fixCode(copyOfOps[i]);
    const newCompy = new Compy(input);
    newCompy.setOperations(copyOfOps);
    newCompy.compute();
    if (newCompy.terminated) {
      return newCompy.accumulator;
    }
  }
  return 0;
};

// console.log(
//   "ANSWER DAY PART DWOOO!!?",
//   findAnswerDayEightPartTwo(puzzleInputDayEight)
// );
