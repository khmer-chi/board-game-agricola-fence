import { extend } from '@pixi/react';
import { fenceBase } from '../config';
import { Graphics, LayoutContainer } from '@pixi/layout/components';
extend({
  LayoutContainer,
  Graphics,
});
export const Point = ({ i, j }: { i: number; j: number }) => {
  const key = i + '-' + j + '-point';
  return (
    <layoutContainer
      layout={{ width: fenceBase, height: fenceBase }}
      onClick={(e: Event) => {
        e.stopPropagation();
        console.log(key);
      }}
    >
      <pixiGraphics
        draw={(graphics) => {
          graphics.clear();
          graphics.setFillStyle({ color: 'red' });
          graphics.arc(fenceBase / 2, fenceBase / 2, fenceBase / 2, 0, (360 * Math.PI) / 180);
          graphics.fill();
        }}
      />
    </layoutContainer>
  );
};
