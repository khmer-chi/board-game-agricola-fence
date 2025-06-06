import { useSnapshot } from "valtio";
import { hoverObjectKeySetStore } from "./store/hoverObjectKeySetStore";
import { permanentObjectKeySetStore } from "./store/permanentObjectKeySetStore";

export const useBackgroundColor = (key: string) => {
  const $permanentObjectKeySetStore = useSnapshot(permanentObjectKeySetStore);
  const $hoverObjectKeySetStore = useSnapshot(hoverObjectKeySetStore);
  const editKey = `edit-${key}`;
  const hoverKey = `hover-${key}`;
  if (
    $permanentObjectKeySetStore.has(editKey) &&
    $hoverObjectKeySetStore.has(hoverKey)
  )
    return "#ff0000";

  if ($permanentObjectKeySetStore.has(editKey)) return "#bb0000";
  if ($hoverObjectKeySetStore.has(hoverKey)) return "#aa0000";
  return "#000000";
};
