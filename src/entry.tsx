import { createRoot } from "react-dom/client";
import { App } from "./App";
import { Fence } from "#component/Fence";
const go = (el: HTMLElement) => {
  createRoot(el).render(<App />);
};
export { Fence, App, go };
