import { extend } from '@pixi/react';
import { squareBase } from '../config';
import { fenceSetStoreToggle } from '../../store/fenceSetStore';
import { LayoutContainer, LayoutText } from '@pixi/layout/components';
import { fenceHoverSetStore, fenceHoverSetStoreToggle } from '../../store/fenceHoverSetStore';
import { editModeStore } from '../../store/editModeStore';
// import { CustomText } from './CustomText';
extend({
  LayoutContainer,
  LayoutText,
});
type Place = 'pastures' | 'wooden-house' | 'clay-house' | 'stone-house';
export const Place = ({ i, j }: { i: number; j: number }) => {
  const key = i + '-' + j + '-place';
  const handler = (e: Event) => {
    e.stopPropagation();
    if (editModeStore.mode != 'square') return;
    const array = [
      i + '-' + j + '-fenceH',
      i + '-' + (j + 1) + '-fenceH',
      i + '-' + j + '-fenceV',
      i + 1 + '-' + j + '-fenceV',
    ];
    array.map((v) => {
      if (e.type == 'click') {
        return fenceSetStoreToggle(v);
      }
      if (e.type == 'pointerover') {
        fenceHoverSetStore.add(v);
      }
      if (e.type == 'pointerout') {
        fenceHoverSetStore.delete(v);
      }
    });
  };
  return (
    <layoutContainer
      layout={{ width: squareBase, height: squareBase, backgroundColor: '#00ff00', alignItems: 'center' }}
      onPointerTap={handler}
      onPointerOver={handler}
      onPointerCancel={handler}
      onPointerOut={handler}
    >
      {/* <CustomText text={key} style={{ fontSize: 10 }} /> */}
      <layoutText
        text={key}
        layout={{
          width: 'intrinsic',
          height: 'intrinsic',
        }}
      />
    </layoutContainer>
  );
};
