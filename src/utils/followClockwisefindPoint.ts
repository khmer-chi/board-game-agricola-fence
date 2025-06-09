import type { Point } from "../schema/PointSchema";
//→=↓→⇡←
//↓=←↓→⇡
//←=⇡←↓→
//↑=→⇡←↓
export const followClockwisefindPoint = (
  currentPoint: Point,
  type: number,
  usedPointSet: Set<string>,
  walkedPathSet: Set<string>,
) => {
  type PointWidthType = Point & { type: number };
  const sortArray: PointWidthType[] = [
    { x: currentPoint.x, y: currentPoint.y + 1, type: 0 },
    { x: currentPoint.x + 1, y: currentPoint.y, type: 1 },
    { x: currentPoint.x, y: currentPoint.y - 1, type: 2 },
    { x: currentPoint.x - 1, y: currentPoint.y, type: 3 },
  ];
  for (let i = 0; i < type; i++) {
    sortArray.unshift(sortArray.pop() as PointWidthType);
  }
  for (let i = 0; i < sortArray.length; i++) {
    const item = sortArray[i];
    const { x, y, type } = item;
    const key = `${x}-${y}`;
    if (usedPointSet.has(key)) {
      walkedPathSet.add(key);
      return type;
    }
  }
  return false;
};
