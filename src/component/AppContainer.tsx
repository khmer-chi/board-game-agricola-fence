import { Application } from "@pixi/react";
import { LayoutResizer } from "./LayoutResizer";
import type { PropsWithChildren } from "react";

export const AppContainer = ({
  children,
  el,
}: PropsWithChildren<{ el?: HTMLElement }>) => {
  const getSize = () => {
    if (el) return { w: el.clientWidth, h: el.clientHeight };

    return { w: window.innerWidth, h: window.innerHeight };
  };

  return (
    <Application background={"#1099bb"} resizeTo={window}>
      <LayoutResizer getSize={getSize}>{children}</LayoutResizer>
    </Application>
  );
};
