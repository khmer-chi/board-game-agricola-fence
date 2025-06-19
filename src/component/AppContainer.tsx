import { Application } from "@pixi/react";
import { LayoutResizer } from "#component/LayoutResizer";
import type { JSX, PropsWithChildren } from "react";
type Param = PropsWithChildren<{
  el?: HTMLElement;
  render?: ({ w, h }: { w: number; h: number }) => JSX.Element;
}>;
export const AppContainer = ({ render, el }: Param) => {
  const getSize = () => {
    if (el) return { w: el.clientWidth, h: el.clientHeight };

    return { w: window.innerWidth, h: window.innerHeight };
  };

  return (
    <Application resizeTo={el ?? window} backgroundAlpha={0}>
      <LayoutResizer getSize={getSize} render={render} />
    </Application>
  );
};
