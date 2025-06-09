import type { Point } from "../schema/PointSchema";

const findShortPoint = (
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
