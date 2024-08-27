export const isInvalidPath = (path: string): boolean => {
  // Check for common invalid characters in paths
  const invalidPathPattern = /[<>:"|?*]/;
  return invalidPathPattern.test(path);
}