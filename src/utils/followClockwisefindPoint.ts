import type { Point } from "../schema/PointSchema";

type PointWidthType = Point & {
  path: string;
};
export const followClockwisefindPoint = (
  { x, y }: Point,
  direction: string,
  usedPointSet: Set<string>,
  usedPathSet: Set<string>,
  walkedPathSet: Set<string>,
) => {
  const directionMap = new Map<string, PointWidthType>([
    ["↓", { x: x, y: y + 1, path: `${x}-${y}-V` }],
    ["→", { x: x + 1, y: y, path: `${x}-${y}-H` }],
    ["⇡", { x: x, y: y - 1, path: `${x}-${y - 1}-V` }],
    ["←", { x: x - 1, y: y, path: `${x - 1}-${y}-H` }],
  ]);
  const directionSortArrayMap = new Map<string, string[]>([
    ["↓", ["←", "↓", "→"]],
    ["→", ["↓", "→", "⇡"]],
    ["⇡", ["→", "⇡", "←"]],
    ["←", ["⇡", "←", "↓"]],
  ]);
  const directionSortArray = directionSortArrayMap.get(direction) ?? [];
  for (let i = 0; i < directionSortArray.length; i++) {
    const direction = directionSortArray[i];
    const item = directionMap.get(direction) as PointWidthType;
    const { x, y, path } = item;
    const key = `${x}-${y}`;
    if (walkedPathSet.has(path)) continue;
    if (usedPointSet.has(key) && usedPathSet.has(path)) {
      walkedPathSet.add(path);
      return { ...item, direction };
    }
  }

  return false;
};
