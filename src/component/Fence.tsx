import { useState } from 'react';
import { fenceSetStoreToggle, fenceSetStore } from '../../store/fenceSetStore';
import { fenceBase, squareBase } from '../config';
import { extend } from '@pixi/react';
import { LayoutContainer } from '@pixi/layout/components';
import { useSnapshot } from 'valtio';
extend({ LayoutContainer });
export const Fence = ({ i, j, isVertical = false }: { i: number; j: number; isVertical?: boolean }) => {
  const key = i + '-' + j + '-fence' + (isVertical ? 'V' : 'H');
  const fenceSetStoreSnap = useSnapshot(fenceSetStore);
  const width = isVertical ? fenceBase : squareBase;
  const height = isVertical ? squareBase : fenceBase;
  const [isHover, setIsHover] = useState(false);
  const backgroundColor = (() => {
    if (fenceSetStoreSnap.has(key)) return '#ff0000';
    if (isHover) return '#aa0000';

    return '#000000';
  })();
  return (
    <layoutContainer
      layout={{ width, height, backgroundColor }}
      onPointerTap={(e: Event) => {
        e.stopPropagation();
        fenceSetStoreToggle(key);
      }}
      onPointerOver={() => setIsHover(true)}
      onPointerCancel={() => setIsHover(false)}
      onPointerOut={() => setIsHover(false)}
    >
      {/* <pixiText text={'isHover' + (isHover ? 1 : 0)}></pixiText> */}
    </layoutContainer>
  );
};
