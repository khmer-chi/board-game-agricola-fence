import { hoverFenceKeySetStore } from "#store/hoverFenceKeySetStore";
import { permanentFenceKeySetStoreToggle } from "#store/permanentFenceKeySetStore";

export const commonHandler = (e: Event, key: string) => {
  if (e.type == "click") return permanentFenceKeySetStoreToggle(key);
  if (e.type == "pointerover") return hoverFenceKeySetStore.add(key);
  if (e.type == "pointerout") return hoverFenceKeySetStore.delete(key);
};
