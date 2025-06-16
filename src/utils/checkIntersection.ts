export const checkIntersection = (aSet: Set<string>, bSet: Set<string>) => {
  for (const key of aSet) {
    if (bSet.has(key)) return true;
  }
  return false;
};
