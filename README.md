# how to install

npm install board-game-agricola-fence

# how to use

```js
import { renderBoard } from "board-game-agricola-fence";
const { fenceKeySet, watch } = renderBoard(document.getElementById("root")!);
//設定柵欄
[
  "3-0-H",
  "2-1-V",
  "2-0-V",
  "2-0-H",
  "2-2-H",
  "4-2-H",
  "5-1-V",
  "4-0-H",
  "5-0-V",
  "4-1-V",
  "3-1-H",
  "2-1-H",
  "3-2-H",
].map((key) => fenceKeySet.add(key));
//監看柵欄並回傳柵欄和圈地
watch((fenceStore, closureStore) => {
  console.log(fenceStore, closureStore);
});
```

# 農家樂圈地判斷

1. 需要判斷圈地為連續封閉
2. 完成後計算圈地及可放動物種類及數量
3. 以圈地為準反推柵欄，判斷木頭量
4. 以柵欄為準反推圈地，判斷封閉判斷木頭量
5. 以點為準畫柵欄，判斷封閉判斷木頭量
6. 每個圈地不需要連續

# TODO

1. [x] 判斷柵欄圈地是封閉
2. [x] place store
3. [x] 模組化 npm

# 注意事項

1. StrictMode tag render 會執行兩次,使 pixi layout 產生錯誤
