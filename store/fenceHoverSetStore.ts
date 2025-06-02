import { proxySet } from 'valtio/utils';
export const fenceHoverSetStore = proxySet<string>([]);

export const fenceHoverSetStoreToggle = (key: string) => {
  if (fenceHoverSetStore.has(key)) {
    fenceHoverSetStore.delete(key);
    return;
  }
  fenceHoverSetStore.add(key);
};
