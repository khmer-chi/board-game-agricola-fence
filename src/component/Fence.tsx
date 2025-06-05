import { fenceBase, squareBase } from '../config';
import { extend } from '@pixi/react';
import { LayoutContainer } from '@pixi/layout/components';
import { settingStore } from '../store/settingStore';
import { useBackgroundColor } from '../useBackgroundColor';
import { commonHandler } from '../commonHandler';
extend({ LayoutContainer });

export const Fence = ({ i, j, isVertical = false }: { i: number; j: number; isVertical?: boolean }) => {
  const key = i + '-' + j + '-fence' + (isVertical ? 'V' : 'H');
  const backgroundColor = useBackgroundColor(key);
  const width = isVertical ? fenceBase : squareBase;
  const height = isVertical ? squareBase : fenceBase;
  const handler = (e: Event) => {
    if (e.type == 'click') {
      console.log(key);
    }
    if (settingStore.mode != 'edge') return;
    e.stopPropagation();
    commonHandler(e, key);
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
