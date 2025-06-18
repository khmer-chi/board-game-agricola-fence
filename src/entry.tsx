import { createRoot } from "react-dom/client";
import { App } from "./App";
import { getPastures } from "#utils/getPastures";
import { createStore } from "#utils/createStore";
import { NotClosureError } from "#utils/error/NotClosureError";
import { subscribe } from "valtio";
import { fenceBase, squareBase } from "#config";

export const renderBoard = (el: HTMLElement) => {
  const containerW = squareBase * 5 + fenceBase * (5 + 1);
  const containerH = squareBase * 3 + fenceBase * (3 + 1);

  el.style.position = "relative";
  el.style.width = "100%";
  el.style.paddingBottom = `${(containerH * 100) / containerW}%`;
  const mainEl = document.createElement("div");
  mainEl.style.position = "absolute";
  mainEl.style.top = "0";
  mainEl.style.left = "0";
  mainEl.style.width = "100%";
  mainEl.style.height = "100%";
  el.appendChild(mainEl);

  const store = createStore();
  const _getPastures = () => {
    try {
      return getPastures(store.permanentFenceKeySetStore);
    } catch (e) {
      if (e instanceof NotClosureError) {
        console.log("it's not closure");
      }
    }
    return false;
  };
  createRoot(mainEl).render(
    <App
      el={mainEl}
      store={store}
      containerW={containerW}
      containerH={containerH}
    />,
  );
  return {
    permanentFenceKeySetStore: store.permanentFenceKeySetStore,
    watch: (
      cb?: (
        fenceStore: Set<string>,
        closureStore: Set<string>[] | false,
      ) => void,
    ) => {
      const func = () => {
        cb?.(
          new Set(Array.from(store.permanentFenceKeySetStore)),
          _getPastures(),
        );
      };
      func();
      subscribe(store.permanentFenceKeySetStore, func);
    },
  };
};
