import { permanentFenceKeySetStore } from "../store/permanentFenceKeySetStore";

type Point = { x: number; y: number };
const findShortPoint = (
  startPoint: Point,
  currentPoint: Point,
  {
    pointSet,
    pathSet,
    walkedPathSet,
  }: {
    pointSet: Set<string>;
    pathSet: Set<string>;
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
      pointSet.has(`${x}-${y}`) && pathSet.has(path) && !walkedPathSet.has(path)
    );
  });
  if (!pointArray.length) return false;
  let min = -1;
  let resultPoint = { x: 0, y: 0, path: "" };
  pointArray.map((item) => {
    const { x, y } = item;
    const result = (x - startPoint.x) ** 2 + (y - currentPoint.y) ** 2;
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
export const closureCheck = () => {
  const pointSet = new Set<string>();
  const pathSet = new Set<string>();
  Array.from(permanentFenceKeySetStore).map((v) => {
    pathSet.add(v);
    const match = v.match(/(\d)-(\d)-(\w)/);
    if (match) {
      const x = Number.parseInt(match[1]);
      const y = Number.parseInt(match[2]);
      const type = match[3];
      if (type == "H") {
        pointSet.add(`${x}-${y}`);
        pointSet.add(`${x + 1}-${y}`);
      } else if (type == "V") {
        pointSet.add(`${x}-${y}`);
        pointSet.add(`${x}-${y + 1}`);
      }
    }
  });
  const getStartPoint = () => {
    for (let x = 0; x < 6; x++) {
      for (let y = 0; y < 4; y++) {
        if (pointSet.has(`${x}-${y}`)) return { x, y };
      }
    }
    return false;
  };
  const walkedPathSet = new Set<string>();
  const startPoint = getStartPoint();

  if (startPoint) {
    let currentPoint = startPoint;

    const walkPointArray = [];
    for (let i = 0; i < 10; i++) {
      const shortPoint = findShortPoint(startPoint, currentPoint, {
        pointSet,
        pathSet,
        walkedPathSet,
      });
      if (!shortPoint) break;

      currentPoint = shortPoint;
      walkPointArray.push(currentPoint);
    }
    console.log(walkPointArray, walkedPathSet);
  }
};
