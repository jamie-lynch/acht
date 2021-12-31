import { formatDate } from "./datetime";

describe("The formatDate function", () => {
  it("returns the hours and minutes of a timestamp", () => {
    expect(formatDate(1640960823647)).toBe("14:27");
  });
});
