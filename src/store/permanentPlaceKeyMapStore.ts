import { subscribe } from "valtio";
import { proxyMap } from "valtio/utils";
import type { Place } from "#schema/PlaceSchema";

export const permanentPlaceKeyMapStore = proxyMap<string, Place>(
  JSON.parse(
    localStorage.getItem("permanentPlaceKeyMapStore") ??
      JSON.stringify([
        ["0-1", "wooden-house"],
        ["0-2", "wooden-house"],
      ] as [string, Place][]),
  ) || [],
);
export const permanentPlaceKeyMapStoreReset = () => {
  permanentPlaceKeyMapStore.clear();
  new Map([
    ["0-1", "wooden-house"],
    ["0-2", "wooden-house"],
  ]);
};
subscribe(permanentPlaceKeyMapStore, () => {
  localStorage.setItem(
    "permanentPlaceKeyMapStore",
    JSON.stringify(Array.from(permanentPlaceKeyMapStore)),
  );
});
