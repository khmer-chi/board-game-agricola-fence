import type { Point } from "../schema/PointSchema";
import { followClockwisefindPoint } from "./followClockwisefindPoint";

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
      addUsedPointSet(`${x}-${y}`, "→");
      addUsedPointSet(`${x + 1}-${y}`, "←");
    } else if (type == "V") {
      addUsedPointSet(`${x}-${y}`, "↓");
      addUsedPointSet(`${x}-${y + 1}`, "⇡");
    }
  }

  const startPointArray = Array.from(countPointHasPath)
    .filter(([key, set]) => {
      //右邊緣忽略
      if (key.startsWith("5")) return false;
      //下邊緣忽略
      if (key.endsWith("3")) return false;
      //找點和柵欄連結是右下
      return set.has("→") && set.has("↓");
    })
    .map(([key]) => {
      const [x, y] = key.split("-");
      return { x: Number.parseInt(x), y: Number.parseInt(y) } as Point;
    });

  const finallyUsedFence = new Set<string>(fenceKeySetStore);

  const result: Set<string>[] = [];
  for (let i = 0; i < startPointArray.length; i++) {
    let loopCount = 0;
    const startPoint = startPointArray[i];
    const walkedPathSet = new Set<string>();
    let currentPoint = startPoint;
    let direction = "⇡";
    while (true) {
      const nextPoint = followClockwisefindPoint(
        currentPoint,
        direction,
        usedPointSet,
        usedPathSet,
        walkedPathSet,
      );

      if (!nextPoint) return false;

      currentPoint = nextPoint;
      direction = nextPoint.direction;
      if (nextPoint.x == startPoint.x && nextPoint.y == startPoint.y) break;

      if (++loopCount >= 100) throw Error("loopCount");
    }

    for (const key of walkedPathSet) {
      finallyUsedFence.delete(key);
    }
    result.push(walkedPathSet);
  }
  if (finallyUsedFence.size) return false;
  return result;
};
