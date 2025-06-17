import type { Mode } from "#schema/ModeSchema";
import type { Place } from "#schema/PlaceSchema";
import { proxy, subscribe } from "valtio";
import { proxyMap, proxySet } from "valtio/utils";
export const createStore = (key = "") => {
  const hoverFenceKeySetStore = proxySet<string>([]);
  const permanentFenceKeySetStore = proxySet<string>(
    JSON.parse(
      localStorage.getItem(`${key}_permanentFenceKeySetStore`) ?? "[]",
    ) || [],
  );
  subscribe(permanentFenceKeySetStore, () => {
    localStorage.setItem(
      `${key}_permanentFenceKeySetStore`,
      JSON.stringify(Array.from(permanentFenceKeySetStore)),
    );
  });

  const settingStore = proxy<{
    mode: Mode;
  }>(
    JSON.parse(
      localStorage.getItem(`${key}_settingStore`) ??
        JSON.stringify({
          mode: "edge",
        } as { mode: Mode }),
    ),
  );

  subscribe(settingStore, () => {
    localStorage.setItem("settingStore", JSON.stringify(settingStore));
  });
  const permanentPlaceKeyMapStore = proxyMap<string, Place>(
    JSON.parse(
      localStorage.getItem("permanentPlaceKeyMapStore") ??
        JSON.stringify([
          ["0-1", "wooden-house"],
          ["0-2", "wooden-house"],
        ] as [string, Place][]),
    ) || [],
  );
  subscribe(permanentPlaceKeyMapStore, () => {
    localStorage.setItem(
      "permanentPlaceKeyMapStore",
      JSON.stringify(Array.from(permanentPlaceKeyMapStore)),
    );
  });
  return {
    permanentFenceKeySetStore,
    hoverFenceKeySetStore,
    settingStore,
    permanentPlaceKeyMapStore,
  };
};
