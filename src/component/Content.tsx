import { Fence } from './Fence';
import { Place } from './Place';
import { Point } from './Point';
const func = (result: any[], j: number) => {
  for (let i = 0; i <= 5; i++) {
    result.push(<Point i={i} j={j} key={i + '-' + j + '-point'} />);
    if (i == 5) continue;
    result.push(<Fence i={i} j={j} key={i + '-' + j + '-fenceH'} />);
  }
};
const func1 = (result: any[], j: number) => {
  for (let i = 0; i <= 5; i++) {
    result.push(<Fence i={i} j={j} isVertical={true} key={i + '-' + j + '-fenceV'} />);
    if (i == 5) continue;
    result.push(<Place i={i} j={j} key={i + '-' + j + '-place'} />);
  }
};
export const Content = () => {
  const result: any[] = [];
  for (let i = 0; i <= 3; i++) {
    func(result, i);
    if (i == 3) continue;
    func1(result, i);
  }
  return result;
};
