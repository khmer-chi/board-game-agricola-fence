import { LayoutContainer, LayoutText } from "@pixi/layout/components";
import { extend } from "@pixi/react";
import { commonHandler } from "../commonHandler";
import { squareBase } from "../config";
import { settingStore } from "../store/settingStore";
extend({
  LayoutContainer,
  LayoutText,
});

const useHandler = (i: number, j: number) => {
  return (e: Event) => {
    e.stopPropagation();
    if (settingStore.mode != "square") return;
    const array = [
      `${i}-${j}-fenceH`,
      `${i}-${j + 1}-fenceH`,
      `${i}-${j}-fenceV`,
      `${i + 1}-${j}-fenceV`,
    ];
    array.map((v) => {
      commonHandler(e, v);
    });
  };
};
export const Place = ({ i, j }: { i: number; j: number }) => {
  const key = `${i}-${j}-place`;
  const handler = useHandler(i, j);
  return (
    <layoutContainer
      layout={{
        width: squareBase,
        height: squareBase,
        backgroundColor: "#00ff00",
        alignItems: "center",
      }}
      onPointerTap={handler}
      onPointerOver={handler}
      onPointerCancel={handler}
      onPointerOut={handler}
    >
      {/* <CustomText text={key} style={{ fontSize: 10 }} /> */}
      {/* <layoutText
        text={key}
        layout={{
          width: 'intrinsic',
          height: 'intrinsic',
        }}
      /> */}
    </layoutContainer>
  );
};
