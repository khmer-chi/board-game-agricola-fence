import { useSnapshot } from "valtio";
// import type { proxySet } from "valtio/utils";
import { hoverFenceKeySetStore } from "#store/hoverFenceKeySetStore";
import { permanentFenceKeySetStore } from "#store/permanentFenceKeySetStore";

export const useBackgroundColor = (
  key: string,
  // permanentFenceKeySetStore: ReturnType<typeof proxySet<string>>,
  // hoverFenceKeySetStore: ReturnType<typeof proxySet<string>>,
) => {
  const $permanentFenceKeySetStore = useSnapshot(permanentFenceKeySetStore);
  const $hoverFenceKeySetStore = useSnapshot(hoverFenceKeySetStore);

  if ($permanentFenceKeySetStore.has(key) && $hoverFenceKeySetStore.has(key))
    return "#ff0000";

  if ($permanentFenceKeySetStore.has(key)) return "#bb0000";
  if ($hoverFenceKeySetStore.has(key)) return "#aa0000";
  return "#000000";
};
