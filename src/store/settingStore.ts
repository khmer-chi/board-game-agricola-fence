import { proxy, subscribe } from 'valtio';
import { Mode } from '../schema/ModeSchema';

export const settingStore = proxy<{ mode: Mode }>({
  mode: (localStorage.getItem('editModeStore') as Mode) ?? 'square',
});

subscribe(settingStore, () => {
  localStorage.setItem('editModeStore', settingStore.mode);
});
