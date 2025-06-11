import { permanentFenceKeySetStore } from "../store/permanentFenceKeySetStore";
import { NotClosureError } from "./error/NotClosureError";
import { intersectionSquareGroup } from "./intersectionSquareGroup";
import { pathSetToObject } from "./pathSetToObject";
import { pointSetToObject } from "./pointSetToObject";

export const getPastures = (set: Set<string>) => {
  const list = pathSetToObject(set);
  const map = new Map<string, string[]>();
  const countPointConnectFence = new Map<string, number>();
  const pointIncreaseOneFence = (key: string) => {
    if (!countPointConnectFence.has(key)) countPointConnectFence.set(key, 0);
    let count = countPointConnectFence.get(key) ?? 0;
    countPointConnectFence.set(key, ++count);
  };
  for (let i = 0; i < list.length; i++) {
    const { x, y, type } = list[i];
    const key = type == "H" ? x : y;
    const value = type == "H" ? y : x;
    const groupKey = `${type}-${key}`;
    if (!map.has(groupKey)) map.set(groupKey, []);
    (map.get(groupKey) as any[]).push(value);
    pointIncreaseOneFence(`${x}-${y}`);
    if (type == "H") {
      pointIncreaseOneFence(`${x + 1}-${y}`);
    } else {
      pointIncreaseOneFence(`${x}-${y + 1}`);
    }
  }
  for (const [_key, count] of countPointConnectFence) {
    if (count < 2) {
      throw new NotClosureError("point connect one fence", 0);
    }
  }

  const squareSet = new Set<string>();
  const needRemoveFence = new Set<string>();
  const squareGroupSetArray: Set<string>[] = [];
  for (const [key, list] of map) {
    const keyArray = key.split("-");
    // if (list.length <= 1) throw new NotClosureError("it's not closure", 0);
    const type = keyArray[0];
    const a = Number.parseInt(keyArray[1]);
    const listAfterSort = list
      .map((v) => Number.parseInt(v))
      .toSorted((a, b) => {
        return a - b;
      });

    let start = listAfterSort.shift() as number;
    while (listAfterSort.length) {
      const squareGroupSet = new Set<string>();
      const end = listAfterSort.shift() as number;
      for (let b = start; b < end; b++) {
        let key = "";
        if (type == "H") {
          key = `${a}-${b}`;
        } else {
          key = `${b}-${a}`;
        }

        squareSet.add(key);
        squareGroupSet.add(key);
        if (b >= start + 1 && b <= end) {
          needRemoveFence.add(`${key}-${type}`);
        }
      }
      squareGroupSetArray.push(squareGroupSet);
      start = end;
    }
  }
  // console.log(squareGroupSetArray);

  const expectFenceSet = new Set<string>();

  for (const { x, y } of pointSetToObject(squareSet)) {
    [`${x}-${y}-H`, `${x}-${y + 1}-H`, `${x}-${y}-V`, `${x + 1}-${y}-V`].map(
      (key) => {
        if (!needRemoveFence.has(key)) expectFenceSet.add(key);
      },
    );
  }
  if (expectFenceSet.size != permanentFenceKeySetStore.size) {
    throw new NotClosureError("expect fence incorrect", 1);
  }
  return intersectionSquareGroup(squareGroupSetArray);
};
