import { createRoot } from "react-dom/client";
import { App } from "./App";
import { permanentFenceKeySetStore as fenceKeySetStore } from "#store/permanentFenceKeySetStore";
import { permanentPlaceKeyMapStore as placeKeyMapStore } from "#store/permanentPlaceKeyMapStore";
const renderElement = (el: HTMLElement) => {
  createRoot(el).render(<App />);
};

export { fenceKeySetStore, placeKeyMapStore, renderElement };
