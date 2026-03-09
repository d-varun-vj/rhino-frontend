export const swapArrayElements = <T>(
  array: T[],
  indexA: number,
  indexB: number
): void => {
  [array[indexA], array[indexB]] = [array[indexB], array[indexA]];
};
