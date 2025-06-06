import { proxySet } from "valtio/utils";
export const hoverFenceKeySetStore = proxySet<string>([]);

export const hoverFenceKeySetStoreToggle = (key: string) => {
  if (hoverFenceKeySetStore.has(key)) {
    hoverFenceKeySetStore.delete(key);
    return;
  }
  hoverFenceKeySetStore.add(key);
};
