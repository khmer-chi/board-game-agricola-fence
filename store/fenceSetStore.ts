import { subscribe } from 'valtio';
import { proxySet } from 'valtio/utils';
export const fenceSetStore = proxySet<string>(JSON.parse(localStorage.getItem('fenceSetStore') ?? '[]') || []);

export const fenceSetStoreToggle = (key: string) => {
  if (fenceSetStore.has(key)) {
    fenceSetStore.delete(key);
    return;
  }
  fenceSetStore.add(key);
};

subscribe(fenceSetStore, () => {
  localStorage.setItem('fenceSetStore', JSON.stringify(Array.from(fenceSetStore)));
});
