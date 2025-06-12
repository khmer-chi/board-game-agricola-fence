import { useApplication } from "@pixi/react";

export const LayoutResizer = <T extends any>({
  children,
  getSize,
}: { children: T; getSize: () => { w: number; h: number } }): T => {
  const { app } = useApplication();
  const { w, h } = getSize();
  app.stage.layout = {
    width: w,
    height: h,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  app.renderer.on("resize", () => {
    const { w, h } = getSize();
    app.stage.layout = {
      width: w,
      height: h,
    };
  });
  return children;
};
