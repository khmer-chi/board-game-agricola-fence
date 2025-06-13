import { proxy, subscribe } from "valtio";
import type { Mode } from "#schema/ModeSchema";

export const settingStore = proxy<{ mode: Mode }>({
  mode: (localStorage.getItem("editModeStore") as Mode) ?? "square",
});

subscribe(settingStore, () => {
  localStorage.setItem("editModeStore", settingStore.mode);
});
