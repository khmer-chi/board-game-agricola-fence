import { useSnapshot } from "valtio";
import { hoverFenceKeySetStore } from "#store/hoverFenceKeySetStore";
import { permanentFenceKeySetStore } from "#store/permanentFenceKeySetStore";

export const useBackgroundColor = (key: string) => {
  const $permanentFenceKeySetStore = useSnapshot(permanentFenceKeySetStore);
  const $hoverFenceKeySetStore = useSnapshot(hoverFenceKeySetStore);

  if ($permanentFenceKeySetStore.has(key) && $hoverFenceKeySetStore.has(key))
    return "#ff0000";

  if ($permanentFenceKeySetStore.has(key)) return "#bb0000";
  if ($hoverFenceKeySetStore.has(key)) return "#aa0000";
  return "#000000";
};
