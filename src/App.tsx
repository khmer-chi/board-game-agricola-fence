import "@pixi/layout";
import "@pixi/layout/react";
import { fenceBase, squareBase } from "./config";
import { AppContainer } from "#component/AppContainer";
import { Content } from "#component/Content";
import { extend } from "@pixi/react";
import { LayoutContainer } from "@pixi/layout/components";
import type { BaseStore } from "#schema/BaseStore";
import type { PropsWithChildren } from "react";
import { createStore } from "#utils/createStore";
extend({ LayoutContainer });

export function App({
  el,
  store = createStore(),
}: PropsWithChildren<{ el?: HTMLElement; store?: BaseStore }>) {
  const containerW = squareBase * 5 + fenceBase * (5 + 1);
  const containerH = squareBase * 3 + fenceBase * (3 + 1);

  return (
    <AppContainer
      el={el}
      render={({ w, h }) => {
        let scale = w / containerW;
        if (containerH * scale > h) {
          scale = h / containerH;
        }
        return (
          <layoutContainer
            scale={scale}
            layout={{
              width: containerW,
              flexWrap: "wrap",
              alignContent: "flex-start",
            }}
          >
            <Content store={store} />
          </layoutContainer>
        );
      }}
    />
  );
}
