import { commonHandler } from "#commonHandler";
import { fenceBase, squareBase } from "#config";
import { settingStore } from "#store/settingStore";
import { useBackgroundColor } from "#useBackgroundColor";

import { LayoutContainer, LayoutText } from "@pixi/layout/components";
import { extend } from "@pixi/react";
extend({ LayoutContainer, LayoutText });

export const Fence = ({
  i,
  j,
  isVertical = false,
}: {
  i: number;
  j: number;
  isVertical?: boolean;
}) => {
  const key = `${i}-${j}-${isVertical ? "V" : "H"}`;
  const backgroundColor = useBackgroundColor(key);
  const width = isVertical ? fenceBase : squareBase;
  const height = isVertical ? squareBase : fenceBase;
  const handler = (e: Event) => {
    if (settingStore.mode != "edge") return;
    e.stopPropagation();
    commonHandler(e, key);
  };
  return (
    <layoutContainer
      layout={{ width, height, backgroundColor }}
      onPointerTap={handler}
      onPointerOver={handler}
      onPointerCancel={handler}
      onPointerOut={handler}
    >
      <layoutText
        text={`${i}-${j}${isVertical ? "V" : "H"}`}
        style={{ fill: "#ffffff" }}
      />
    </layoutContainer>
  );
};
