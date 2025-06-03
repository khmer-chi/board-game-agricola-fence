import { objectKeySetStore, objectKeySetStoreToggle } from './store/objectKeySetStore';

export const commonHandler = (e: Event, key: string) => {
  const editKey = 'edit-' + key;
  const hoverKey = 'hover-' + key;
  if (e.type == 'click') return objectKeySetStoreToggle(editKey);
  if (e.type == 'pointerover') return objectKeySetStore.add(hoverKey);
  if (e.type == 'pointerout') return objectKeySetStore.delete(hoverKey);
};
