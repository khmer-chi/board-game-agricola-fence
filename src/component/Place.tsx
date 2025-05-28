import { extend } from '@pixi/react';
import { squareBase } from '../config';
import { fenceSetStoreToggle } from '../../store/fenceSetStore';
import { LayoutContainer, LayoutText } from '@pixi/layout/components';
// import { CustomText } from './CustomText';
extend({
  LayoutContainer,
  LayoutText,
});
type Place = 'pastures' | 'wooden-house' | 'clay-house' | 'stone-house';
export const Place = ({ i, j }: { i: number; j: number }) => {
  const key = i + '-' + j + '-place';
  return (
    <layoutContainer
      layout={{ width: squareBase, height: squareBase, backgroundColor: '#00ff00', alignItems: 'center' }}
      onClick={(e: Event) => {
        e.stopPropagation();
        [
          i + '-' + j + '-fenceH',
          i + '-' + (j + 1) + '-fenceH',
          i + '-' + j + '-fenceV',
          i + 1 + '-' + j + '-fenceV',
        ].map((v) => fenceSetStoreToggle(v));
      }}
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
