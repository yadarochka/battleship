export function isOutsideOfArray(length: number) {
  return (index: number, summand: number) => {
    if (index + summand > length - 1 || index - summand < 0) {
      return true;
    } else false;
  };
}
