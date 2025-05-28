import '@pixi/layout';
import { Application } from '@pixi/react';
import { LayoutResizer } from './component/LayoutResizer';
import { fenceBase, squareBase } from './config';
import { Content } from './component/Content';
import { fenceSetStore } from '../store/fenceSetStore';
import { CustomText } from './component/CustomText';
import { useSnapshot } from 'valtio';
export function App() {
  const containerW = squareBase * 5 + fenceBase * (5 + 1);
  const fenceSetStoreSnap = useSnapshot(fenceSetStore);
  return (
    <Application background={'#1099bb'} resizeTo={window}>
      <LayoutResizer>
        <layoutContainer
          layout={{
            width: containerW,
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',

            marginBottom: 5,
            paddingLeft: 10,
            backgroundColor: '#ffffff',
          }}
        >
          <CustomText text={'fence:' + fenceSetStoreSnap.size} style={{ fontSize: 20 }} />
        </layoutContainer>
        <layoutContainer
          layout={{
            width: containerW,
            flexWrap: 'wrap',
            alignContent: 'flex-start',
          }}
        >
          <Content />
        </layoutContainer>
        <layoutContainer layout={{ width: containerW, justifyContent: 'flex-start' }}>
          <layoutText
            text={'reset'}
            layout={{ width: 'intrinsic', height: 'intrinsic', backgroundColor: '#0000ff', padding: 2, marginTop: 5 }}
            style={{ fill: '#ffffff', fontSize: 20 }}
            onPointerTap={() => {
              fenceSetStore.clear();
            }}
          />
        </layoutContainer>
      </LayoutResizer>
    </Application>
  );
}
