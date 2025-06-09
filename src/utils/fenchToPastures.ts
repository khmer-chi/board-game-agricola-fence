export const fenchToPastures = (fenceStoreSet: Set<string>) => {
  const fenceArray = Array.from(fenceStoreSet);
  const map = new Map<number, number[]>();
  for (let i = 0; i < fenceArray.length; i++) {
    const key = fenceArray[i];
    const match = key.match(/(\d)-(\d)-(\w)/);
    if (match) {
      const x = Number.parseInt(match[1]);
      const y = Number.parseInt(match[2]);
      const type = match[3];
      if (type == "H") {
        if (!map.has(x)) map.set(x, []);
        const array = map.get(x) ?? [];
        array.push(y);
      }
    }
  }
  const pastureSet = new Set<string>();
  map.forEach((yArray, x) => {
    const [start, end] = yArray.toSorted((a, b) => a - b);
    for (let y = start; y < end; y++) {
      pastureSet.add(`${x}-${y}`);
    }
  });
  return pastureSet;
};
