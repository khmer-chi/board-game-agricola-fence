// import { Application, extend } from '@pixi/react';
// import { Container, Graphics, Sprite } from 'pixi.js';
// import '@pixi/layout';
// import { BunnySprite } from './BunnySprite';
// extend({
//   Container,
//   Graphics,
//   Sprite,
// });
// export const App = function () {
//   return (
//     <Application>
//       <BunnySprite />
//     </Application>
//   );
// };

// import '@pixi/layout/react';
// import '@pixi/layout';
// import { LayoutContainer } from '@pixi/layout/components';
// import React, { useEffect, useRef, useState } from 'react';
// import { extend, useApplication, Application } from '@pixi/react';
// import { Assets, Container } from 'pixi.js';

// extend({
//   Container,
//   LayoutContainer,
// });

// const LayoutResizer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const { app } = useApplication();
//   void app.renderer.layout.enableDebug(true);
//   app.stage.layout = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//     justifyContent: 'center',
//     alignItems: 'center',
//   };

//   useEffect(() => {
//     // enable the layout
//     app.renderer.layout.enableDebug(true);
//     console.log('app.stage.layout', app.stage.layout);
//     // listen for resize events on the renderer
//     app.renderer.on('resize', () => {
//       app.stage.layout = {
//         width: window.innerWidth,
//         height: window.innerHeight,
//       };
//     });
//   }, [app.renderer]);

//   return children;
// };

// export function App({ children, assets }) {
//   const [isInitialized, setIsInitialized] = useState(false);

//   useEffect(() => {
//     const start = async () => {
//       assets ??= [];
//       const parsedAssets = assets.map((asset) => {
//         if (asset.startsWith('https://fakeimg.pl/')) {
//           return {
//             alias: asset,
//             src: asset,
//             loadParser: 'loadTextures',
//           };
//         }

//         return asset;
//       });

//       // Perform async initialization here
//       await Assets.load(parsedAssets);
//       setIsInitialized(true);
//     };

//     void start();
//   }, []);

//   if (!isInitialized) {
//     return <div>Loading...</div>;
//   }

//   return (
//     <Application resizeTo={window} background={'#1C1C1D'}>
//       <LayoutResizer>{children}</LayoutResizer>
//     </Application>
//   );
// }

import '@pixi/layout';
import Application from './boilerplate.jsx';

const defaults = {
  backgroundColor: `#1e293b`,
  borderWidth: 1,
  borderColor: `#fff`,
};

export function App() {
  return (
    <Application>
      <layoutContainer
        layout={{
          ...defaults,
          width: 200,
          height: 250,
          padding: 10,
          alignContent: 'center',
          flexDirection: 'column',
          flexWrap: 'wrap',
          backgroundColor: `#0f172a`,
        }}
      >
        <layoutContainer layout={{ ...defaults, margin: 5, height: 50, width: 50 }} />
        <layoutContainer layout={{ ...defaults, margin: 5, height: 50, width: 50 }} />
        <layoutContainer layout={{ ...defaults, margin: 5, height: 50, width: 50 }} />
        <layoutContainer layout={{ ...defaults, margin: 5, height: 50, width: 50 }} />
      </layoutContainer>
    </Application>
  );
}
