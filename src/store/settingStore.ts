import { proxy, subscribe } from "valtio";
import type { Mode } from "#schema/ModeSchema";
type Setting = {
  mode: Mode;
};
export const settingStore = proxy<Setting>(
  JSON.parse(
    localStorage.getItem("settingStore") ??
      JSON.stringify({
        mode: "edge",
      } as { mode: Mode }),
  ),
);

subscribe(settingStore, () => {
  localStorage.setItem("editModeStore", JSON.stringify(settingStore));
});
