import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
const __dirname = dirname(fileURLToPath(import.meta.url));
import dts from "vite-plugin-dts";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      rollupTypes: true,
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, "src/entry.tsx"),
      name: "BoardGameAgricolaFence",
      fileName: "board-game-agricola-fence",
      formats: ["es"],
    },
    rollupOptions: {
      // 外部化 React 依赖
      external: [
        "react",
        "react-dom",
        "pixi.js",
        "@pixi/react",
        "@pixi/layout",
        "@pixi/ui",
        // "valibot",
        // "valtio",
      ],
      // output: {
      //   // UMD 模式下的全局变量
      //   globals: {
      //     react: "React",
      //     "react-dom": "ReactDOM",
      //   },
      // },
    },
    sourcemap: true, // 生成 source map
    chunkSizeWarningLimit: 1000,
  },
});
