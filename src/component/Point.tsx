import { Graphics, LayoutContainer } from "@pixi/layout/components";
import { extend } from "@pixi/react";
import { fenceBase } from "../config";
import { useBackgroundColor } from "../useBackgroundColor";
extend({
  LayoutContainer,
  Graphics,
});

export const Point = ({ i, j }: { i: number; j: number }) => {
  const key = `${i}-${j}-point`;
  const handler = (e: Event) => {
    // if (settingStore.mode != 'point') return;
    // e.stopPropagation();
    // commonHandler(e, key);
  };
  const color = useBackgroundColor(key);
  return (
    <layoutContainer
      layout={{ width: fenceBase, height: fenceBase }}
      onPointerTap={handler}
      onPointerOver={handler}
      onPointerCancel={handler}
      onPointerOut={handler}
    >
      <pixiGraphics
        draw={(graphics) => {
          graphics.clear();
          graphics.setFillStyle({ color });
          graphics.arc(
            fenceBase / 2,
            fenceBase / 2,
            fenceBase / 2,
            0,
            (360 * Math.PI) / 180,
          );
          graphics.fill();
        }}
      />
    </layoutContainer>
  );
};
