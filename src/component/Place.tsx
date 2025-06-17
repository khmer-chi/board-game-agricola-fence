import { useCommonHandler } from "#useCommonHandler";

import { CustomText } from "./CustomText";

import { LayoutContainer, LayoutText } from "@pixi/layout/components";
import { extend } from "@pixi/react";
import { debugText, squareBase } from "#config";

import type { BaseStore } from "#schema/BaseStore";
extend({
  LayoutContainer,
  LayoutText,
});
type Param = {
  i: number;
  j: number;
  store: BaseStore;
};
const useHandler = ({ i, j, store }: Param) => {
  const { settingStore, permanentPlaceKeyMapStore } = store;
  return (e: Event) => {
    e.stopPropagation();
    if (settingStore.mode != "square") return;
    const key = `${i}-${j}`;
    if (permanentPlaceKeyMapStore.has(key)) {
      if (permanentPlaceKeyMapStore.get(key) != "pastures") return;
    }
    const array = [
      `${i}-${j}-H`,
      `${i}-${j + 1}-H`,
      `${i}-${j}-V`,
      `${i + 1}-${j}-V`,
    ];
    array.map((v) => {
      const commonHandler = useCommonHandler(v, store);
      commonHandler(e);
    });
  };
};
export const Place = ({ i, j, store }: Param) => {
  const key = `${i}-${j}`;
  const handler = useHandler({
    i,
    j,
    store,
  });
  const text = key;
  return (
    <layoutContainer
      layout={{
        width: squareBase,
        height: squareBase,
        backgroundColor: "#00ff00",
        alignItems: "center",
        justifyContent: "center",
      }}
      onPointerTap={handler}
      onPointerOver={handler}
      onPointerCancel={handler}
      onPointerOut={handler}
    >
      {debugText && (
        <CustomText text={text} style={{ fontSize: 10, align: "center" }} />
      )}
      {/* <layoutText
        text={text}
        layout={{
          width: "intrinsic",
          height: "intrinsic",
        }}
      /> */}
    </layoutContainer>
  );
};
