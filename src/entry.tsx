import { createRoot } from "react-dom/client";
import { App } from "./App";
import { getPastures } from "#utils/getPastures";
const renderElement = (el: HTMLElement) => {
  createRoot(el).render(<App el={el} />);
};

export { renderElement };
