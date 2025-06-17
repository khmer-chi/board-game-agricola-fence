import { hoverFenceKeySetStore } from "#store/hoverFenceKeySetStore";
import { permanentFenceKeySetStoreToggle } from "#store/permanentFenceKeySetStore";
// import type { proxySet } from "valtio/utils";

export const useCommonHandler = (
  key: string,
  // permanentFenceKeySetStoreToggle: (key: string) => void,
  // hoverFenceKeySetStore: ReturnType<typeof proxySet<string>>,
) => {
  return (e: Event) => {
    if (e.type == "click") return permanentFenceKeySetStoreToggle(key);
    if (e.type == "pointerover") return hoverFenceKeySetStore.add(key);
    if (e.type == "pointerout") return hoverFenceKeySetStore.delete(key);
  };
};
