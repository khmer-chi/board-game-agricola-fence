import { subscribe } from "valtio";
import { proxySet } from "valtio/utils";

import { getPastures } from "#utils/getPastures";
import { NotClosureError } from "#utils/error/NotClosureError";
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
  localStorage.setItem(
    "permanentFenceKeySetStore",
    JSON.stringify(Array.from(permanentFenceKeySetStore)),
  );
  console.clear();
  try {
    console.log(getPastures(permanentFenceKeySetStore));
  } catch (e) {
    if (e instanceof NotClosureError) {
      console.log("it's not closure");
    }
  }
});
