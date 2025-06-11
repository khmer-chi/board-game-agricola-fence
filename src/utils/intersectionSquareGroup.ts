import { checkIntersection } from "../store/checkIntersection";

export const intersectionSquareGroup = (squareGroupSetArray: Set<string>[]) => {
  const result = [];
  let loopCount = 0;
  while (squareGroupSetArray.length) {
    const tmpSquareGroupSetArray = [];
    const current = squareGroupSetArray.pop() as Set<string>;
    while (squareGroupSetArray.length) {
      const next = squareGroupSetArray.pop() as Set<string>;
      if (checkIntersection(current, next)) {
        squareGroupSetArray.push(
          new Set([...Array.from(current), ...Array.from(next)]),
        );
        break;
      }
      tmpSquareGroupSetArray.push(next);
    }

    if (!squareGroupSetArray.length) {
      result.push(current);
    }
    while (tmpSquareGroupSetArray.length)
      squareGroupSetArray.push(tmpSquareGroupSetArray.pop() as Set<string>);

    if (++loopCount >= 100) break;
  }
  return result;
};
