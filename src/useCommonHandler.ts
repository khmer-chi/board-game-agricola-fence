import { hoverFenceKeySetStore } from "#store/hoverFenceKeySetStore";
import { permanentFenceKeySetStore } from "#store/permanentFenceKeySetStore";
import { toggleStringSet } from "#utils/toggleStringSet";
// import type { proxySet } from "valtio/utils";

export const useCommonHandler = (
  key: string,
  // permanentFenceKeySetStore: (key: string) => void,
  // hoverFenceKeySetStore: ReturnType<typeof proxySet<string>>,
) => {
  return (e: Event) => {
    if (e.type == "click")
      return toggleStringSet(permanentFenceKeySetStore, key);
    if (e.type == "pointerover") return hoverFenceKeySetStore.add(key);
    if (e.type == "pointerout") return hoverFenceKeySetStore.delete(key);
  };
};
