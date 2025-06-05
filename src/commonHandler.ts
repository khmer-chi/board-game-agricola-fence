import { permanentObjectKeySetStoreToggle } from './store/permanentObjectKeySetStore';
import { hoverObjectKeySetStore } from './store/hoverObjectKeySetStore';

export const commonHandler = (e: Event, key: string) => {
  const editKey = 'edit-' + key;
  const hoverKey = 'hover-' + key;
  if (e.type == 'click') return permanentObjectKeySetStoreToggle(editKey);
  if (e.type == 'pointerover') return hoverObjectKeySetStore.add(hoverKey);
  if (e.type == 'pointerout') return hoverObjectKeySetStore.delete(hoverKey);
};
