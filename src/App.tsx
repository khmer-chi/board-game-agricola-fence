import "@pixi/layout";
import "@pixi/layout/react";
import { AppContainer } from "#component/AppContainer";
import { Content } from "#component/Content";
import { extend } from "@pixi/react";
import { LayoutContainer } from "@pixi/layout/components";
import type { BaseStore } from "#schema/BaseStore";
import type { PropsWithChildren } from "react";
extend({ LayoutContainer });

export function App({
  el,
  store,
  containerW,
  containerH,
}: PropsWithChildren<{
  el?: HTMLElement;
  store: BaseStore;
  containerW: number;
  containerH: number;
}>) {
  return (
    <AppContainer
      el={el}
      render={({ w, h }) => {
        let scale = 1;
        scale = w / containerW;
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
