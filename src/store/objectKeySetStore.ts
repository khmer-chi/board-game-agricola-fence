import { subscribe } from 'valtio';
import { proxySet } from 'valtio/utils';
export const objectKeySetStore = proxySet<string>(JSON.parse(localStorage.getItem('objectKeySetStore') ?? '[]') || []);

export const objectKeySetStoreToggle = (key: string) => {
  if (objectKeySetStore.has(key)) {
    objectKeySetStore.delete(key);
    return;
  }
  objectKeySetStore.add(key);
};

subscribe(objectKeySetStore, () => {
  localStorage.setItem('objectKeySetStore', JSON.stringify(Array.from(objectKeySetStore)));
});
