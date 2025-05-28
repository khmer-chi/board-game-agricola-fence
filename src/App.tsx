import '@pixi/layout';
import { Application, extend } from '@pixi/react';
import { LayoutContainer, LayoutGraphics, LayoutText, LayoutView } from '@pixi/layout/components';
import { LayoutResizer } from './LayoutResizer';
import { Container, Graphics, Text } from 'pixi.js';
import { useState } from 'react';
import { state } from './store';
import { useSnapshot } from 'valtio';
import { Point } from './Point';
import { Fence } from './Fence';
import { Place } from './Place';
extend({
  LayoutText,
  LayoutContainer,
  LayoutView,
  Graphics,
});

const fenceBase = 10;
const squareBase = 50;
const func = (result: any[], j: number) => {
  for (let i = 0; i <= 5; i++) {
    result.push(<Point i={i} j={j} />);
    if (i == 5) continue;
    result.push(<Fence i={i} j={j} />);
  }
};
const func1 = (result: any[], j: number) => {
  for (let i = 0; i <= 5; i++) {
    result.push(<Fence i={i} j={j} isVertical={true} />);
    if (i == 5) continue;
    result.push(<Place i={i} j={j} />);
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
