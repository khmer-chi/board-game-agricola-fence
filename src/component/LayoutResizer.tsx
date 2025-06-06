import { useApplication } from "@pixi/react";

export const LayoutResizer = <T extends any>({
  children,
}: { children: T }): T => {
  const { app } = useApplication();
  app.stage.layout = {
    width: window.innerWidth,
    height: window.innerHeight,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  };
  app.renderer.on("resize", () => {
    app.stage.layout = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  return children;
};
