import { createRoot } from "react-dom/client";
import { App } from "./App";
import { permanentFenceKeySetStore as fenceKeySetStore } from "#store/permanentFenceKeySetStore";
import { permanentPlaceKeyMapStore as placeKeyMapStore } from "#store/permanentPlaceKeyMapStore";
import { getPastures } from "#utils/getPastures";
const renderElement = (el: HTMLElement) => {
  createRoot(el).render(<App el={el} />);
};

export { fenceKeySetStore, placeKeyMapStore, renderElement };
