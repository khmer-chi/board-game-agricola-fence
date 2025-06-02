import { useEffect, useState } from 'react';
import { fenceSetStoreToggle, fenceSetStore } from '../../store/fenceSetStore';
import { fenceHoverSetStoreToggle, fenceHoverSetStore } from '../../store/fenceHoverSetStore';
import { fenceBase, squareBase } from '../config';
import { extend } from '@pixi/react';
import { LayoutContainer } from '@pixi/layout/components';
import { proxy, subscribe, useSnapshot } from 'valtio';
import { editModeStore } from '../../store/editModeStore';
extend({ LayoutContainer });
export const Fence = ({ i, j, isVertical = false }: { i: number; j: number; isVertical?: boolean }) => {
  const key = i + '-' + j + '-fence' + (isVertical ? 'V' : 'H');
  const $fenceSetStore = useSnapshot(fenceSetStore);
  const $fenceHoverSetStore = useSnapshot(fenceHoverSetStore);
  // const [isHover, setIsHover] = useState(false);

  const width = isVertical ? fenceBase : squareBase;
  const height = isVertical ? squareBase : fenceBase;
  const backgroundColor = (() => {
    if ($fenceSetStore.has(key)) return '#ff0000';
    if ($fenceHoverSetStore.has(key)) return '#aa0000';
    return '#000000';
  })();
  return (
    <layoutContainer
      layout={{ width, height, backgroundColor }}
      onPointerTap={(e: Event) => {
        if (editModeStore.mode != 'edge') return;
        e.stopPropagation();
        fenceSetStoreToggle(key);
      }}
      onPointerOver={(e: Event) => {
        if (editModeStore.mode != 'edge') return;
        e.stopPropagation();
        fenceHoverSetStore.add(key);
      }}
      onPointerCancel={(e: Event) => {
        if (editModeStore.mode != 'edge') return;
        e.stopPropagation();
        fenceHoverSetStore.delete(key);
      }}
      onPointerOut={(e: Event) => {
        if (editModeStore.mode != 'edge') return;
        e.stopPropagation();
        fenceHoverSetStore.delete(key);
      }}
    >
      {/* <pixiText text={'isHover' + (isHover ? 1 : 0)}></pixiText> */}
    </layoutContainer>
  );
};
