import { useCommonHandler } from "#useCommonHandler";
import { debugText, fenceBase, squareBase } from "#config";
import { useBackgroundColor } from "#useBackgroundColor";

import { LayoutContainer, LayoutText } from "@pixi/layout/components";
import { extend } from "@pixi/react";
import type { BaseStore } from "#schema/BaseStore";
extend({ LayoutContainer, LayoutText });
type Param = {
  i: number;
  j: number;
  isVertical?: boolean;
  store: BaseStore;
};
export const Fence = ({ i, j, isVertical = false, store }: Param) => {
  const key = `${i}-${j}-${isVertical ? "V" : "H"}`;
  const commonHandler = useCommonHandler(key, store);
  const backgroundColor = useBackgroundColor(key, store);
  const width = isVertical ? fenceBase : squareBase;
  const height = isVertical ? squareBase : fenceBase;
  const handler = (e: Event) => {
    if (store.settingStore.mode != "edge") return;
    e.stopPropagation();
    commonHandler(e);
  };
  return (
    <layoutContainer
      layout={{ width, height, backgroundColor }}
      onPointerTap={handler}
      onPointerOver={handler}
      onPointerCancel={handler}
      onPointerOut={handler}
    >
      {debugText && (
        <layoutText
          text={`${i}-${j}${isVertical ? "V" : "H"}`}
          style={{ fill: "#ffffff" }}
        />
      )}
    </layoutContainer>
  );
};
