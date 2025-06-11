export const pointSetToObject = (set: Set<string>) => {
  const result = [];
  for (const key of set) {
    const keyArray = key.split("-");
    const x = Number.parseInt(keyArray[0]);
    const y = Number.parseInt(keyArray[1]);
    result.push({ x, y });
  }
  return result;
};
