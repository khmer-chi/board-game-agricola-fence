import { subscribe } from 'valtio';
import { proxySet } from 'valtio/utils';
export const state = proxySet<string>([]);
subscribe(state, () => {
  console.log(state.data);
});
