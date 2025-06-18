import { useApplication } from "@pixi/react";
import { useEffect, useState, type JSX, type PropsWithChildren } from "react";
type Param = PropsWithChildren<{
  getSize: () => { w: number; h: number };
  render?: ({ w, h }: { w: number; h: number }) => JSX.Element;
}>;

export const LayoutResizer = ({ getSize, render }: Param) => {
  const { app } = useApplication();
  const [size, setSize] = useState(getSize());
  app.stage.layout = {
    justifyContent: "center",
    alignItems: "center",
  };
  useEffect(() => {
    app.stage.layout = {
      width: size.w,
      height: size.h,
    };
  }, [size, app.stage]);

  app.renderer.on("resize", () => {
    setSize(getSize());
  });
  return render?.(size);
};
