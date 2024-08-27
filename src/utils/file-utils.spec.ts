import { isInvalidPath } from "./file-utils"; // Adjust the import path according to your file structure

describe("isInvalidPath", () => {
  it("should return true for paths with invalid characters", () => {
    const invalidPaths = [
      "C:\\path\\with<invalid>",
      "C:\\path\\with:invalid",
      'C:\\path\\with"invalid"',
      "C:\\path\\with|invalid",
      "C:\\path\\with?invalid",
      "C:\\path\\with*invalid",
      "<invalidPath>",
      ":invalidPath",
      '"invalidPath"',
      "|invalidPath",
      "?invalidPath",
      "*invalidPath",
    ];

    invalidPaths.forEach((path) => {
      expect(isInvalidPath(path)).toBe(true);
    });
  });

  it("should return false for valid paths", () => {
    const validPaths = ["C:\\valid\\path\\file.txt", "/home/user/docs", "./relative/path/file.txt", "../relative/path", "C:\\Users\\Public", "/usr/local/bin", "C:/valid/path/file.txt"];

    validPaths.forEach((path) => {
      expect(isInvalidPath(path)).toBe(false);
    });
  });

  it("should return false for empty strings", () => {
    expect(isInvalidPath("")).toBe(false);
  });

  it("should return false for paths without invalid characters", () => {
    const noInvalidChars = ["simplepath", "another\\simple\\path", "/yet/another/path", "C:\\path\\with\\dots.ext", "./relative/with/dots.ext"];

    noInvalidChars.forEach((path) => {
      expect(isInvalidPath(path)).toBe(false);
    });
  });

  it("should return true for paths that are only invalid characters", () => {
    const onlyInvalidChars = ["<>", ':"', "|", "?", "*"];

    onlyInvalidChars.forEach((path) => {
      expect(isInvalidPath(path)).toBe(true);
    });
  });
});
