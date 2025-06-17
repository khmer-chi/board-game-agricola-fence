import type { ReactElement } from "react";
import { Fence } from "#component/Fence";
import { Place } from "#component/Place";
import { Point } from "#component/Point";
import type { BaseStore } from "#schema/BaseStore";

export const Content = ({ store }: { store: BaseStore }) => {
  const func = (result: ReactElement[], j: number) => {
    for (let i = 0; i <= 5; i++) {
      result.push(<Point i={i} j={j} key={`${i}-${j}-point`} store={store} />);
      if (i == 5) continue;
      result.push(<Fence i={i} j={j} key={`${i}-${j}-fenceH`} store={store} />);
    }
  };
  const func1 = (result: ReactElement[], j: number) => {
    for (let i = 0; i <= 5; i++) {
      result.push(
        <Fence
          i={i}
          j={j}
          isVertical={true}
          key={`${i}-${j}-fenceV`}
          store={store}
        />,
      );
      if (i == 5) continue;
      result.push(<Place i={i} j={j} key={`${i}-${j}-place`} store={store} />);
    }
  };
  const result: ReactElement[] = [];
  for (let i = 0; i <= 3; i++) {
    func(result, i);
    if (i == 3) continue;
    func1(result, i);
  }
  return result;
};
