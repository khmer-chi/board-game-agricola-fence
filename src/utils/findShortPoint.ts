import type { Point } from "../schema/PointSchema";

export const findShortPoint = (
  startPoint: Point,
  currentPoint: Point,
  {
    usedPointSet,
    usedPathSet,
    walkedPathSet,
  }: {
    usedPointSet: Set<string>;
    usedPathSet: Set<string>;
    walkedPathSet: Set<string>;
  },
) => {
  //目前點 依序 右、下、左、上
  const pointArray = [
    {
      x: currentPoint.x + 1,
      y: currentPoint.y,
      path: `${currentPoint.x}-${currentPoint.y}-H`,
    },
    {
      x: currentPoint.x,
      y: currentPoint.y + 1,
      path: `${currentPoint.x}-${currentPoint.y}-V`,
    },
    {
      x: currentPoint.x - 1,
      y: currentPoint.y,
      path: `${currentPoint.x - 1}-${currentPoint.y}-H`,
    },
    {
      x: currentPoint.x,
      y: currentPoint.y - 1,
      path: `${currentPoint.x}-${currentPoint.y - 1}-V`,
    },
  ].filter(({ x, y, path }) => {
    return (
      usedPointSet.has(`${x}-${y}`) &&
      usedPathSet.has(path) &&
      !walkedPathSet.has(path)
    );
  });
  if (!pointArray.length) return false;
  let min = -1;
  let resultPoint = { x: 0, y: 0, path: "" };
  pointArray.map((item) => {
    const { x, y } = item;
    const result = (x - startPoint.x) ** 2 + (y - startPoint.y) ** 2;
    if (min == -1) {
      min = result;
      resultPoint = item;
    } else if (min > result) {
      min = result;
      resultPoint = item;
    }
  });

  walkedPathSet.add(resultPoint.path);

  if (resultPoint.x == startPoint.x && resultPoint.y == startPoint.y)
    return false;

  return resultPoint;
};
