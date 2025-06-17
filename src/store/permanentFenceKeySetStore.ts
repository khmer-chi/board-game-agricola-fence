import { subscribe } from "valtio";
import { proxySet } from "valtio/utils";

export const permanentFenceKeySetStore = proxySet<string>(
  JSON.parse(localStorage.getItem("permanentFenceKeySetStore") ?? "[]") || [],
);

subscribe(permanentFenceKeySetStore, () => {
  localStorage.setItem(
    "permanentFenceKeySetStore",
    JSON.stringify(Array.from(permanentFenceKeySetStore)),
  );
  // console.clear();
  // try {
  //   console.log(getPastures(permanentFenceKeySetStore));
  // } catch (e) {
  //   if (e instanceof NotClosureError) {
  //     console.log("it's not closure");
  //   }
  // }
});
