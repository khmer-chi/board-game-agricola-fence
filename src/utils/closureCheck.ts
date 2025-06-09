import type { Point } from "../schema/PointSchema";
import { findShortPoint } from "./findShortPoint";

export const closureCheck = (fenceKeySetStore: Set<string>) => {
  const usedPointSet = new Set<string>();
  const usedPathSet = new Set<string>();
  const countPointHasPath = new Map<string, Set<string>>();
  const addUsedPointSet = (key: string, type: string) => {
    if (!countPointHasPath.has(key))
      countPointHasPath.set(key, new Set<string>());
    const set = countPointHasPath.get(key) as Set<string>;
    set.add(type);

    usedPointSet.add(key);
  };
  for (const key of fenceKeySetStore) {
    usedPathSet.add(key);
    const match = key.split("-");
    if (!match.length) throw Error();
    const x = Number.parseInt(match[0]);
    const y = Number.parseInt(match[1]);
    const type = match[2];
    if (type == "H") {
      addUsedPointSet(`${x}-${y}`, "right");
      addUsedPointSet(`${x + 1}-${y}`, "left");
    } else if (type == "V") {
      addUsedPointSet(`${x}-${y}`, "down");
      addUsedPointSet(`${x}-${y + 1}`, "up");
    }
  }

  const startPointArray = Array.from(countPointHasPath)
    .filter(([key, set]) => {
      //右邊緣忽略
      if (key.startsWith("5")) return false;
      //下邊緣忽略
      if (key.endsWith("3")) return false;
      //找點和柵欄連結是右下
      return set.has("right") && set.has("down");
    })
    .map(([key]) => {
      const [x, y] = key.split("-");
      return { x: Number.parseInt(x), y: Number.parseInt(y) } as Point;
    });

  const result: Set<string>[] = [];
  for (let i = 0; i < startPointArray.length; i++) {
    let loopCount = 0;
    const startPoint = startPointArray[i];
    const walkedPathSet = new Set<string>();
    let currentPoint = startPoint;

    while (true) {
      const shortPoint = findShortPoint(startPoint, currentPoint, {
        usedPointSet,
        usedPathSet,
        walkedPathSet,
      });

      if (!shortPoint) break;
      currentPoint = shortPoint;
      if (++loopCount >= 100) throw Error("loopCount");
    }
    result.push(walkedPathSet);
  }
  return result;
};
