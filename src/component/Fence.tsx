import { useCommonHandler } from "#useCommonHandler";
import { debugText, fenceBase, squareBase } from "#config";
import { settingStore } from "#store/settingStore";
import { useBackgroundColor } from "#useBackgroundColor";

import { LayoutContainer, LayoutText } from "@pixi/layout/components";
import { extend } from "@pixi/react";
extend({ LayoutContainer, LayoutText });
type Param = {
  i: number;
  j: number;
  isVertical?: boolean;
};
export const Fence = ({ i, j, isVertical = false }: Param) => {
  const key = `${i}-${j}-${isVertical ? "V" : "H"}`;
  const commonHandler = useCommonHandler(key);
  const backgroundColor = useBackgroundColor(key);
  const width = isVertical ? fenceBase : squareBase;
  const height = isVertical ? squareBase : fenceBase;
  const handler = (e: Event) => {
    if (settingStore.mode != "edge") return;
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
