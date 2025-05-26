import '@pixi/layout';
import { Application, extend } from '@pixi/react';
import { LayoutContainer, LayoutText } from '@pixi/layout/components';
import { LayoutResizer } from './LayoutResizer';
import { useState } from 'react';
import { LayoutOptions } from '@pixi/layout';

extend({
  LayoutText,
  LayoutContainer,
});

export function App() {
  // const [count] = useState(15);
  // const array = [];
  // for (let i = 0; i < count; i++) {
  //   array.push(i);
  // }
  // const [Array] = useState(['#ff0000', '#00ff00', '#0000ff', '#1099bb']);
  const width = 50;
  const height = 50;
  const backgroundColor = '#00ff00';
  const containerW = width * 5;
  const containerH = height * 3;
  const containerLayout = {
    width: containerW,
    height: containerH,
    padding: 0,
    alignContent: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  } as LayoutOptions;
  const array = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 5; j++) {
      array.push({ y: i, x: j });
    }
  }

  return (
    <Application background={'#1099bb'} resizeTo={window}>
      <LayoutResizer>
        <layoutContainer layout={containerLayout}>
          {array.map(({ x, y }) => (
            <layoutContainer
              key={x + ':' + y}
              layout={{
                width,
                height,
                backgroundColor,
                flexDirection: 'row',
                alignContent: 'center',
                justifyContent: 'center',
              }}
            >
              <layoutText text={x + ':' + y} />
            </layoutContainer>
          ))}
        </layoutContainer>
        <layoutContainer layout={{ ...containerLayout, position: 'absolute', alignContent: 'flex-start' }}>
          {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
            <layoutContainer
              layout={{
                width,
                height: 10,
                backgroundColor: '#ffffff',
                marginBottom: (containerH - 40) / 3,
              }}
            >
              <layoutText text={i - 1} />
            </layoutContainer>
          ))}
        </layoutContainer>
        <layoutContainer
          layout={{
            ...containerLayout,
            position: 'absolute',
            flexDirection: 'column',
            alignContent: 'flex-start',
            justifyContent: 'flex-start',
            // marginTop: -10,
            // marginLeft: 10,
          }}
        >
          {Array.from({ length: 3 }, (_, i) => i + 1).map((_, i) => (
            <layoutContainer
              layout={{
                width: containerLayout.width,
                justifyContent: 'space-between',
              }}
            >
              {Array.from({ length: 6 }, (_, i) => i + 1).map((_, j) => (
                <layoutContainer
                  layout={{
                    width: 10,
                    height,
                    backgroundColor: '#ffff00',
                    // marginRight: (containerW - 6 * 10) / 5,
                  }}
                >
                  <layoutText text={i * 6 + j} />
                </layoutContainer>
              ))}
            </layoutContainer>
          ))}
        </layoutContainer>
      </LayoutResizer>
    </Application>
  );
}
