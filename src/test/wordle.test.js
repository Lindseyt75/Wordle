const { Wordle, GREEN, YELLOW, GRAY } = require("../classes/Wordle.js");

describe("Wordle", () => {
  it("if guess has a diffirent number of letters than wordle, it should return empty array", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("boom");
    expect(result).toEqual([]);
  });
  it("if guess matches the wordle, return array of all greens", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("alert");
    expect(result).toEqual([GREEN, GREEN, GREEN, GREEN, GREEN]);
  });
  it("if first letter is in the right position return green for that position", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("abbbb");
    expect(result).toEqual([GREEN, GRAY, GRAY, GRAY, GRAY]);
  });
  it("if last letter in the right position return green for that position", () => {
    const wordle = new Wordle("alerts");
    const result = wordle.checkWord("bbbbbs");
    expect(result).toEqual([GRAY, GRAY, GRAY, GRAY, GRAY, GREEN]);
  });
  it("if letter exist but in the wrong position return yellow", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("bbabb");
    expect(result).toEqual([GRAY, GRAY, YELLOW, GRAY, GRAY]);
  });
  it("if letter exist only one time on the wordle return the second letter gray", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("abbab");
    expect(result).toEqual([GREEN, GRAY, GRAY, GRAY, GRAY]);
  });
  it("if two of the same letter exist in the wordle and in the guess", () => {
    const wordle = new Wordle("alera");
    const result = wordle.checkWord("abbab");
    expect(result).toEqual([GREEN, GRAY, GRAY, YELLOW, GRAY]);
  });
  it("if two of the same letter exist in the guess but only one in the wordle but position doesnt match", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("babab");
    expect(result).toEqual([GRAY, YELLOW, GRAY, GRAY, GRAY]);
  });
  it("if no letters part of the wordle return all gray", () => {
    const wordle = new Wordle("alert");
    const result = wordle.checkWord("bbbbb");
    expect(result).toEqual([GRAY, GRAY, GRAY, GRAY, GRAY]);
  });
  describe("letterRepeatedInGuess", () => {
    it("guess word has no repeated letters", () => {
      const wordle = new Wordle("alert");
      const result = wordle.letterRepeatedInGuess("abcde", 0);
      expect(result).toEqual(false);
    });
    it("guess word has repeated letters but only one exist in wordle", () => {
      const wordle = new Wordle("alert");
      const result = wordle.letterRepeatedInGuess("abate", 2);
      expect(result).toEqual(true);
    });
    it("guess word has repeated letters but only one exist in wordle", () => {
        const wordle = new Wordle("alert");
        const result = wordle.letterRepeatedInGuess("abate", 0);
        expect(result).toEqual(false);
      });
  });
});