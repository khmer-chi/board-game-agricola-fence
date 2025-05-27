import '@pixi/layout';
import { Application, extend } from '@pixi/react';
import { LayoutContainer, LayoutText } from '@pixi/layout/components';
import { LayoutResizer } from './LayoutResizer';

extend({
  LayoutText,
  LayoutContainer,
});
const fenceBase = 10;
const squareBase = 50;
const func = (result: any[], j: number) => {
  for (let i = 0; i <= 5; i++) {
    const pointKey = i + '-' + j + '-point';
    result.push(
      <layoutContainer
        key={pointKey}
        layout={{ width: fenceBase, height: fenceBase, backgroundColor: '#ffffff' }}
        onClick={(e: Event) => {
          e.stopPropagation();
          console.log(pointKey);
        }}
      />
    );
    if (i == 5) continue;
    const fenceKey = i + '-' + j + '-fenceH';
    result.push(
      <layoutContainer
        key={fenceKey}
        layout={{ width: squareBase, height: fenceBase, backgroundColor: '#000000' }}
        onClick={(e: Event) => {
          e.stopPropagation();
          console.log(fenceKey);
        }}
      />
    );
  }
};
const func1 = (result: any[], j: number) => {
  for (let i = 0; i <= 5; i++) {
    const fenceKey = i + '-' + j + '-fenceV';
    result.push(
      <layoutContainer
        key={fenceKey}
        layout={{ width: fenceBase, height: squareBase, backgroundColor: '#000000' }}
        onClick={(e: Event) => {
          e.stopPropagation();
          console.log(fenceKey);
        }}
      />
    );
    if (i == 5) continue;
    const placeKey = i + '-' + j + '-place';
    result.push(
      <layoutContainer
        key={placeKey}
        layout={{ width: squareBase, height: squareBase, backgroundColor: '#00ff00' }}
        onClick={(e: Event) => {
          e.stopPropagation();
          console.log(placeKey);
        }}
      >
        <layoutText text={placeKey} />
      </layoutContainer>
    );
  }
};
const Content = () => {
  const result: any[] = [];
  for (let i = 0; i <= 3; i++) {
    func(result, i);
    if (i == 3) continue;
    func1(result, i);
  }
  return result;
};
export function App() {
  const containerW = squareBase * 5 + fenceBase * (5 + 1);
  return (
    <Application background={'#1099bb'} resizeTo={window}>
      <LayoutResizer>
        <layoutContainer
          layout={{
            width: containerW,
            // height: containerH,
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }}
        >
          <Content />
        </layoutContainer>
      </LayoutResizer>
    </Application>
  );
}
