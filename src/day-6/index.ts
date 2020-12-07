import puzzleInputDaySix from "./input";

export const findUnique = (input: string): string => {
  let seen = "";
  input.split("").forEach((letter) => {
    if (!seen.includes(letter)) {
      seen += letter;
    }
  });
  return seen;
};

export const findGroups = (input: string): string[] => {
  const groups = input.split("\n\n");
  return groups.map((group) => {
    if (group.indexOf("\n") > 0) {
      return findUnique(
        group
          .split("\n")
          .filter((el) => !!el)
          .join("")
      );
    }
    return group;
  });
};

const getIndividualAnswers = (input: string): string[] => {
  return input.split("");
};

export const findConcensus = (input: string): number => {
  const individuals = input.split("\n").map(getIndividualAnswers);

  const groupMembers = individuals.length;

  const questionsAnsweredInGroup = individuals.reduce((acc, prev) => {
    for (const letter of prev) {
      if (acc[letter]) {
        acc[letter] += 1;
      } else {
        acc[letter] = 1;
      }
    }
    return acc;
  }, {});

  const concensusQuestions = Object.keys(questionsAnsweredInGroup).filter(
    (question) => {
      return questionsAnsweredInGroup[question] === groupMembers;
    }
  );
  return concensusQuestions.length;
};

export const findGroupsPartTwo = (input: string): number[] => {
  const groups = input.split("\n\n");
  return groups.map((group) => findConcensus(group));
};

export const yessesToQuestions = (input: string): number => {
  const groups = findGroups(input);
  return groups
    .map((group) => group.length)
    .reduce((acc, curr) => acc + curr, 0);
};

export const yessesToQuestionsPart2 = (input: string): number => {
  const concensusQuestions = findGroupsPartTwo(input);
  return concensusQuestions.reduce((acc, curr) => acc + curr, 0);
};

export const findAnswerPartOne = (input: string): number => {
  return yessesToQuestions(input);
};
