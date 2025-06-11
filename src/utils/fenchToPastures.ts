import { permanentPlaceKeyMapStore } from "../store/permanentPlaceKeyMapStore";

export const fenchToPastures = (fenceStoreSet: Set<string>) => {
  const fenceArray = Array.from(fenceStoreSet);
  const map = new Map<number, number[]>();
  for (let i = 0; i < fenceArray.length; i++) {
    const key = fenceArray[i];
    const match = key.split("-");
    if (!match.length) throw Error();
    const x = Number.parseInt(match[0]);
    const y = Number.parseInt(match[1]);
    const type = match[2];
    if (type == "V") continue;
    if (!map.has(x)) map.set(x, []);
    (map.get(x) as number[]).push(y);
  }

  const pastureSet = new Set<string>();
  map.forEach((yArray, x) => {
    const [start, end] = yArray.toSorted((a, b) => a - b);
    for (let y = start; y < end; y++) {
      const key = `${x}-${y}`;
      pastureSet.add(key);
      // if (!permanentPlaceKeyMapStore.has(key))
      //   permanentPlaceKeyMapStore.set(key, "pastures");
    }
  });
  return pastureSet;
};
