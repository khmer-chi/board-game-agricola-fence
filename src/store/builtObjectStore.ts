import { subscribe } from 'valtio';
import { proxySet } from 'valtio/utils';
export const builtObjectStore = proxySet<string>(JSON.parse(localStorage.getItem('builtObjectStore') ?? '[]') || []);

export const builtObjectStoreToggle = (key: string) => {
  if (builtObjectStore.has(key)) {
    builtObjectStore.delete(key);
    return;
  }
  builtObjectStore.add(key);
};

subscribe(builtObjectStore, () => {
  localStorage.setItem('builtObjectStore', JSON.stringify(Array.from(builtObjectStore)));
});
