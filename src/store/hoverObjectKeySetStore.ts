import { proxySet } from 'valtio/utils';
export const hoverObjectKeySetStore = proxySet<string>([]);

export const hoverObjectKeySetStoreToggle = (key: string) => {
  if (hoverObjectKeySetStore.has(key)) {
    hoverObjectKeySetStore.delete(key);
    return;
  }
  hoverObjectKeySetStore.add(key);
};
