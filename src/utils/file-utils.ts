// TODO enhance later
export const processDirPath = (pathInput: string) => {
  const isMalformedWindowsPath = /^[a-zA-Z]:[^\\]/.test(pathInput);
  const isWindowsAbsolutePath = /^[a-zA-Z]:\\/.test(pathInput);
  const isLinuxOrMacAbsolutePath = pathInput.startsWith("/");
  const isRelativePath = /^(?![a-zA-Z]:\\|\/).+/.test(pathInput) && !isMalformedWindowsPath;
  if (isWindowsAbsolutePath) {
    return "Windows Absolute";
  } else if (isLinuxOrMacAbsolutePath) {
    return "Linux or MacOS Absolute";
  } else if (isRelativePath) {
    return "Relative";
  } else {
    return "Unknown";
  }
};
