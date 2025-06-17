import type { Mode } from "#schema/ModeSchema";
import type { Place } from "#schema/PlaceSchema";
import type { proxyMap, proxySet } from "valtio/utils";

export type BaseStore = {
  permanentFenceKeySetStore: ReturnType<typeof proxySet<string>>;
  hoverFenceKeySetStore: ReturnType<typeof proxySet<string>>;
  permanentPlaceKeyMapStore: ReturnType<typeof proxyMap<string, Place>>;
  settingStore: {
    mode: Mode;
  };
};
