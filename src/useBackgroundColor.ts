import { useSnapshot } from 'valtio';
import { objectKeySetStore } from './store/objectKeySetStore';

export const useBackgroundColor = (key: string) => {
  const $objectKeySetStore = useSnapshot(objectKeySetStore);
  const editKey = 'edit-' + key;
  const hoverKey = 'hover-' + key;
  if ($objectKeySetStore.has(editKey) && $objectKeySetStore.has(hoverKey)) return '#ff0000';

  if ($objectKeySetStore.has(editKey)) return '#bb0000';
  if ($objectKeySetStore.has(hoverKey)) return '#aa0000';
  return '#000000';
};
