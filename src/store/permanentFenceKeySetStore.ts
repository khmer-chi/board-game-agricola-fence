import { subscribe } from "valtio";
import { proxySet } from "valtio/utils";
import { closureCheck } from "../utils/closureCheck";
import { fenchToPastures } from "../utils/fenchToPastures";
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
  const closureFenceArray = closureCheck(permanentFenceKeySetStore);
  if (closureFenceArray) {
    console.log("it's closure");
    for (let i = 0; i < closureFenceArray.length; i++) {
      const patureSet = fenchToPastures(closureFenceArray[i]);
      console.log(patureSet);
    }
  } else {
    console.log("it's not closure");
  }
});
