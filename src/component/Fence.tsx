import { objectKeySetStoreToggle, objectKeySetStore } from '../store/objectKeySetStore';
import { fenceBase, squareBase } from '../config';
import { extend } from '@pixi/react';
import { LayoutContainer } from '@pixi/layout/components';
import { useSnapshot } from 'valtio';
import { settingStore } from '../store/settingStore';
extend({ LayoutContainer });
const useBackgroundColor = (key: string) => {
  const $objectKeySetStore = useSnapshot(objectKeySetStore);
  if ($objectKeySetStore.has(key)) return '#ff0000';
  if ($objectKeySetStore.has('hover-' + key)) return '#aa0000';
  return '#000000';
};
export const Fence = ({ i, j, isVertical = false }: { i: number; j: number; isVertical?: boolean }) => {
  const key = i + '-' + j + '-fence' + (isVertical ? 'V' : 'H');
  const backgroundColor = useBackgroundColor(key);
  const width = isVertical ? fenceBase : squareBase;
  const height = isVertical ? squareBase : fenceBase;
  const handler = (e: Event) => {
    if (settingStore.mode != 'edge') return;
    e.stopPropagation();
    if (e.type == 'click') {
      return objectKeySetStoreToggle(key);
    }
    if (e.type == 'pointerover') {
      return objectKeySetStore.add('hover-' + key);
    }
    if (e.type == 'pointerout') {
      return objectKeySetStore.delete('hover-' + key);
    }
  };
  return (
    <layoutContainer
      layout={{ width, height, backgroundColor }}
      onPointerTap={handler}
      onPointerOver={handler}
      onPointerCancel={handler}
      onPointerOut={handler}
    >
      {/* <pixiText text={'isHover' + (isHover ? 1 : 0)}></pixiText> */}
    </layoutContainer>
  );
};
