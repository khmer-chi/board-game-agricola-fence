import { fenceBase } from './config';

export const Point = ({ i, j }: { i: number; j: number }) => {
  const pointKey = i + '-' + j + '-point';
  return (
    <layoutContainer
      key={pointKey}
      layout={{ width: fenceBase, height: fenceBase }}
      onClick={(e: Event) => {
        e.stopPropagation();
        console.log(pointKey);
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
