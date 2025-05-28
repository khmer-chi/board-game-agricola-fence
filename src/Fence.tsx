import { useSnapshot } from 'valtio';
import { state } from './store';
import { fenceBase, squareBase } from './config';

export const Fence = ({ i, j, isVertical = false }: { i: number; j: number; isVertical?: boolean }) => {
  const fenceKey = i + '-' + j + '-fence' + (isVertical ? 'V' : 'H');
  const store = useSnapshot(state);
  const width = isVertical ? fenceBase : squareBase;
  const height = isVertical ? squareBase : fenceBase;
  return (
    <layoutContainer
      key={fenceKey}
      layout={{ width, height, backgroundColor: store.has(fenceKey) ? '#ff0000' : '#000000' }}
      onClick={(e: Event) => {
        e.stopPropagation();
        if (state.has(fenceKey)) {
          state.delete(fenceKey);
        } else {
          state.add(fenceKey);
        }
      }}
    />
  );
};
