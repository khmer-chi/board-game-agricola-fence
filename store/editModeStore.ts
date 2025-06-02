import { proxy, subscribe } from 'valtio';
export const editModeArray = ['square', 'edge', 'point'] as const;
export type EditMode = (typeof editModeArray)[number];
export const editModeStore = proxy<{ mode: EditMode }>({
  mode: (localStorage.getItem('editModeStore') as EditMode) ?? 'square',
});

subscribe(editModeStore, () => {
  localStorage.setItem('editModeStore', editModeStore.mode);
});
