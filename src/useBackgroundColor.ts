import type { BaseStore } from "#schema/BaseStore";
import { useSnapshot } from "valtio";

export const useBackgroundColor = (
  key: string,
  { permanentFenceKeySetStore, hoverFenceKeySetStore }: BaseStore,
) => {
  const $permanentFenceKeySetStore = useSnapshot(permanentFenceKeySetStore);
  const $hoverFenceKeySetStore = useSnapshot(hoverFenceKeySetStore);

  if ($permanentFenceKeySetStore.has(key) && $hoverFenceKeySetStore.has(key))
    return "#ff0000";

  if ($permanentFenceKeySetStore.has(key)) return "#bb0000";
  if ($hoverFenceKeySetStore.has(key)) return "#aa0000";
  return "#000000";
};
