import { subscribe } from "valtio";
import { proxySet } from "valtio/utils";
export const permanentFenceKeySetStore = proxySet<string>(
  JSON.parse(localStorage.getItem("permanentFenceKeySetStore") ?? "[]") || [],
);

export const permanentFenceKeySetStoreToggle = (key: string) => {
  if (permanentFenceKeySetStore.has(key)) {
    permanentFenceKeySetStore.delete(key);
    return;
  }
  permanentFenceKeySetStore.add(key);
};

subscribe(permanentFenceKeySetStore, () => {
  // console.log(Array.from(permanentFenceKeySetStore));
  localStorage.setItem(
    "permanentFenceKeySetStore",
    JSON.stringify(Array.from(permanentFenceKeySetStore)),
  );
});
