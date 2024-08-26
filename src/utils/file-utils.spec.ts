import { processDirPath } from "./file-utils";

describe("processDirPath", () => {
  test('should return "Windows Absolute" for Windows absolute paths', () => {
    expect(processDirPath("C:\\Users\\User\\Documents")).toBe("Windows Absolute");
    expect(processDirPath("D:\\Projects\\Code")).toBe("Windows Absolute");
  });

  test('should return "Linux or MacOS Absolute" for Linux or MacOS absolute paths', () => {
    expect(processDirPath("/home/user/documents")).toBe("Linux or MacOS Absolute");
    expect(processDirPath("/Users/user/documents")).toBe("Linux or MacOS Absolute");
  });

  test('should return "Relative" for relative paths', () => {
    expect(processDirPath("Documents\\file.txt")).toBe("Relative");
    expect(processDirPath("documents/file.txt")).toBe("Relative");
    expect(processDirPath("some/relative/path")).toBe("Relative");
    expect(processDirPath("some\\relative\\path")).toBe("Relative");
    expect(processDirPath("home/user/documents")).toBe("Relative");
    expect(processDirPath(".\\relative\\path")).toBe("Relative");
    expect(processDirPath("./user/documents")).toBe("Relative");
    expect(processDirPath("..\\relative\\path")).toBe("Relative");
    expect(processDirPath("../user/documents")).toBe("Relative");
  });

  test('should return "Unknown" for unknown paths', () => {
    expect(processDirPath("")).toBe("Unknown");
    expect(processDirPath("C:Users\\User\\Documents")).toBe("Unknown");
    expect(processDirPath("...\\User\\Documents")).toBe("Unknown");
    expect(processDirPath(".../user/documents")).toBe("Unknown");
  });
});
