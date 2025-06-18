import { renderBoard } from "#entry";

const { watch } = renderBoard(document.getElementById("root")!);
watch((fenceStore, closureStore) => {
  console.log(Array.from(fenceStore), closureStore);
});
