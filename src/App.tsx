import '@pixi/layout';
import { Application } from '@pixi/react';
import { LayoutResizer } from './component/LayoutResizer';
import { fenceBase, squareBase } from './config';
import { Content } from './component/Content';
import { fenceSetStore } from '../store/fenceSetStore';
import { editModeStore, editModeArray } from '../store/editModeStore';
import { CustomText } from './component/CustomText';
import { useSnapshot } from 'valtio';
export function App() {
  const $editModeStore = useSnapshot(editModeStore);
  const containerW = squareBase * 5 + fenceBase * (5 + 1);
  const fenceSetStoreSnap = useSnapshot(fenceSetStore);
  return (
    <Application background={'#1099bb'} resizeTo={window}>
      <LayoutResizer>
        <layoutContainer
          layout={{
            width: containerW,
            justifyContent: 'flex-start',
            gap: 5,
            alignItems: 'center',
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          <CustomText text={'mode:'} style={{ fontSize: 20 }} />
          {editModeArray.map((text) => {
            return (
              <layoutContainer
                key={text}
                layout={{ backgroundColor: $editModeStore.mode == text ? '#000011' : '#0000ff', padding: 10 }}
                onPointerTap={(e: Event) => {
                  e.stopPropagation();
                  editModeStore.mode = text;
                }}
              >
                <CustomText
                  text={text}
                  layout={{
                    width: 'intrinsic',
                    height: 'intrinsic',
                  }}
                  style={{ fill: '#ffffff', fontSize: 20 }}
                />
                {/* <layoutText
                  key={text}
                  text={text}
                  layout={{
                    width: 'intrinsic',
                    height: 'intrinsic',
                  }}
                  style={{ fill: '#ffffff', fontSize: 20 }}
                  onPointerTap={() => {
                    editModeStore.mode = text;
                  }}
                /> */}
              </layoutContainer>
            );
          })}
        </layoutContainer>
        <layoutContainer
          layout={{
            width: containerW,
            height: 50,
            justifyContent: 'flex-start',
            alignItems: 'center',

            marginBottom: 5,
            paddingLeft: 10,
            backgroundColor: '#ffffff',
            gap: 10,
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
