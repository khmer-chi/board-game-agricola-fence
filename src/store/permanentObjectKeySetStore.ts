import { subscribe } from "valtio";
import { proxySet } from "valtio/utils";
export const permanentObjectKeySetStore = proxySet<string>(
  JSON.parse(localStorage.getItem("permanentObjectKeySetStore") ?? "[]") || [],
);

export const permanentObjectKeySetStoreToggle = (key: string) => {
  if (permanentObjectKeySetStore.has(key)) {
    permanentObjectKeySetStore.delete(key);
    return;
  }
  permanentObjectKeySetStore.add(key);
};

subscribe(permanentObjectKeySetStore, () => {
  // console.log(Array.from(permanentObjectKeySetStore));
  localStorage.setItem(
    "permanentObjectKeySetStore",
    JSON.stringify(Array.from(permanentObjectKeySetStore)),
  );
});
