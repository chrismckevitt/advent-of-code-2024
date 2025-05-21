export const isWithinTolerance = (larger: number, smaller: number) => {
  const difference = larger - smaller;

  return difference >= 0 && difference <= 3;
};
