import { debugText, fenceBase } from "#config";
import type { BaseStore } from "#schema/BaseStore";
import { useBackgroundColor } from "#useBackgroundColor";

import {
  Graphics,
  LayoutContainer,
  LayoutText,
  LayoutView,
} from "@pixi/layout/components";
import { extend } from "@pixi/react";

extend({
  LayoutText,
  LayoutContainer,
  LayoutView,
  Graphics,
});
type Param = {
  i: number;
  j: number;
  store: BaseStore;
};
export const Point = ({ i, j, store }: Param) => {
  const key = `${i}-${j}-point`;
  const handler = (e: Event) => {
    // if (settingStore.mode != 'point') return;
    // e.stopPropagation();
    // commonHandler(e, key);
  };
  const color = useBackgroundColor(key, store);
  return (
    <layoutContainer
      layout={{ width: fenceBase, height: fenceBase }}
      onPointerTap={handler}
      onPointerOver={handler}
      onPointerCancel={handler}
      onPointerOut={handler}
    >
      <layoutView layout={{ position: "absolute" }}>
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
      </layoutView>
      {debugText && (
        <layoutText text={`${i}-${j}`} style={{ fill: "#ffffff" }} />
      )}
    </layoutContainer>
  );
};
