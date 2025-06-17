import { useApplication } from "@pixi/react";
import { useState, type JSX, type PropsWithChildren } from "react";
type Param = PropsWithChildren<{
  getSize: () => { w: number; h: number };
  render?: ({ w, h }: { w: number; h: number }) => JSX.Element;
}>;

export const LayoutResizer = ({ getSize, render }: Param) => {
  const { app } = useApplication();
  const [size, setSize] = useState(getSize());
  app.stage.layout = {
    width: size.w,
    height: size.h,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  app.renderer.on("resize", () => {
    setSize(getSize());
    app.stage.layout = {
      width: size.w,
      height: size.h,
    };
  });
  return render?.(size);
};
