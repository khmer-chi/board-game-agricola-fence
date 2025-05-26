import { useApplication } from '@pixi/react';
import { FC, useEffect } from 'react';

export const LayoutResizer: FC<any> = <T extends any>({ children }: { children: T }): T => {
  const { app } = useApplication();
  app.stage.layout = {
    width: window.innerWidth,
    height: window.innerHeight,
    justifyContent: 'center',
    alignItems: 'center',
  };
  app.renderer.on('resize', () => {
    console.log('resize');
    app.stage.layout = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
  });

  return children;
};
