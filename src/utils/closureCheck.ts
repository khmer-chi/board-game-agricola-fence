type Point = { x: number; y: number };
const getStartPoint = (pointSet: Set<string>) => {
  if (!pointSet.size) return false;
  for (let x = 0; x < 6; x++) {
    for (let y = 0; y < 4; y++) {
      if (pointSet.has(`${x}-${y}`)) return { x, y };
    }
  }
  return false;
};
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
  return resultPoint;
};

export const closureCheck = (fenceKeySetStore: Set<string>) => {
  const usedPointSet = new Set<string>();
  const usedPathSet = new Set<string>();
  Array.from(fenceKeySetStore).map((v) => {
    usedPathSet.add(v);
    const match = v.match(/(\d)-(\d)-(\w)/);
    if (match) {
      const x = Number.parseInt(match[1]);
      const y = Number.parseInt(match[2]);
      const type = match[3];
      if (type == "H") {
        usedPointSet.add(`${x}-${y}`);
        usedPointSet.add(`${x + 1}-${y}`);
      } else if (type == "V") {
        usedPointSet.add(`${x}-${y}`);
        usedPointSet.add(`${x}-${y + 1}`);
      }
    }
  });
  const unusedPointSet = new Set(Array.from(usedPointSet));
  let loopCount = 0;
  const result = [];
  while (true) {
    const startPoint = getStartPoint(unusedPointSet);

    if (!startPoint) break;
    const walkedPathSet = new Set<string>();
    const walkPointArray = [];
    let currentPoint = startPoint;
    while (true) {
      const shortPoint = findShortPoint(startPoint, currentPoint, {
        usedPointSet,
        usedPathSet,
        walkedPathSet,
      });

      if (!shortPoint) break;
      currentPoint = shortPoint;
      walkPointArray.push(currentPoint);
      unusedPointSet.delete(`${currentPoint.x}-${currentPoint.y}`);
    }
    if (currentPoint.x != startPoint.x) return false;
    if (currentPoint.y != startPoint.y) return false;
    result.push(walkedPathSet);

    if (++loopCount >= 100) return false;
  }
  return result;
};
