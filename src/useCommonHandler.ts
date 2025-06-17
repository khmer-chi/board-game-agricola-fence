import type { BaseStore } from "#schema/BaseStore";
import { toggleStringSet } from "#utils/toggleStringSet";

export const useCommonHandler = (
  key: string,
  { permanentFenceKeySetStore, hoverFenceKeySetStore }: BaseStore,
) => {
  return (e: Event) => {
    if (e.type == "click")
      return toggleStringSet(permanentFenceKeySetStore, key);
    if (e.type == "pointerover") return hoverFenceKeySetStore.add(key);
    if (e.type == "pointerout") return hoverFenceKeySetStore.delete(key);
  };
};
