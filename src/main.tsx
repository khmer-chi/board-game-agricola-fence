import { createRoot } from "react-dom/client";
import { App } from "#App";

const el = document.getElementById("root") as HTMLElement;

createRoot(el).render(<App />);
