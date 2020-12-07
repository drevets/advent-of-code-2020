/*
abc = 1 person, answered yes to 3 questions

a
b
c

3 people, answered yes to 3 questions

ab
ac

2 people, answered yes to 3 question

a
a
a
a

4 people, answered yes to 1 question

b

1 person, answered yes to one questions

need to identify the questions to which EVERYONE said yes


*/

import {
  findAnswerPartOne,
  findGroups,
  findUnique,
  yessesToQuestions,
  yessesToQuestionsPart2,
} from ".";

const sampleInput = `abc

a
b
c

ab
ac

a
a
a
a

b`;

const s = `a
b
c`;

const h = `ab
ac`;

const l = `a
a
a
a`;

const g = `ysjircxtgfzpb
ynsxpgtcifz
riydpzsfxutcg
gsyitzdvpfcrox
yclxfzietsmghwp`;

describe("yessesToQuestions", () => {
  it("can answer the sample input", () => {
    expect(yessesToQuestions("abc")).toBe(3);
    expect(yessesToQuestions(s)).toBe(3);
    expect(yessesToQuestions(h)).toBe(3);
    expect(yessesToQuestions(l)).toBe(1);
    expect(yessesToQuestions(`b`)).toBe(1);
  });
  it("can find total for a long string", () => {
    expect(findAnswerPartOne(sampleInput)).toBe(11);
  });
  it("can make group from strings", () => {
    expect(findGroups(sampleInput)).toStrictEqual([
      "abc",
      "abc",
      "abc",
      "a",
      "b",
    ]);
  });
  it("can find unnique values in strings", () => {
    expect(findUnique("a")).toStrictEqual("a");
    expect(findUnique("aa")).toStrictEqual("a");
    expect(findUnique("aab")).toStrictEqual("ab");
  });
});

describe("yessesToQuestionsPartTwo", () => {
  it("can answer the sample input", () => {
    expect(yessesToQuestionsPart2("abc")).toBe(3);
    expect(yessesToQuestionsPart2(s)).toBe(0);
    expect(yessesToQuestionsPart2(h)).toBe(1);
    expect(yessesToQuestionsPart2(l)).toBe(1);
    expect(yessesToQuestionsPart2(`b`)).toBe(1);
  });
  it("can find total for a long string", () => {
    expect(yessesToQuestionsPart2(sampleInput)).toBe(6);
  });

  it("can use real input", () => {
    expect(
      yessesToQuestionsPart2(`c
    jc
    ck
    cue
    c`)
    ).toBe(1);
    expect(yessesToQuestionsPart2(g)).toBe(10);
  });
});
