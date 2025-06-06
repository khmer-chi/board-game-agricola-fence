import "@pixi/layout";
import { Application } from "@pixi/react";
import { useSnapshot } from "valtio";
import { Content } from "./component/Content";
import { CustomText } from "./component/CustomText";
import { LayoutResizer } from "./component/LayoutResizer";
import { fenceBase, squareBase } from "./config";
import { ModeArray } from "./schema/ModeSchema";
import { permanentFenceKeySetStore } from "./store/permanentFenceKeySetStore";
import { settingStore } from "./store/settingStore";

export function App() {
  const $settingStore = useSnapshot(settingStore);
  const containerW = squareBase * 5 + fenceBase * (5 + 1);
  const $permanentFenceKeySetStore = useSnapshot(permanentFenceKeySetStore);
  const countFence = Array.from($permanentFenceKeySetStore).filter((v) =>
    v.startsWith("edit-"),
  ).length;
  return (
    <Application background={"#1099bb"} resizeTo={window}>
      <LayoutResizer>
        <layoutContainer
          layout={{
            width: containerW,
            justifyContent: "flex-start",
            gap: 5,
            alignItems: "center",
            marginLeft: 10,
            marginBottom: 10,
          }}
        >
          <CustomText text={"mode:"} style={{ fontSize: 20 }} />
          {ModeArray.map((text) => {
            return (
              <layoutContainer
                key={text}
                layout={{
                  backgroundColor:
                    $settingStore.mode == text ? "#000011" : "#0000ff",
                  padding: 10,
                }}
                onPointerTap={(e: Event) => {
                  e.stopPropagation();
                  settingStore.mode = text;
                }}
              >
                <CustomText
                  text={text}
                  layout={{
                    width: "intrinsic",
                    height: "intrinsic",
                  }}
                  style={{ fill: "#ffffff", fontSize: 20 }}
                />
                {/* <layoutText
                  key={text}
                  text={text}
                  layout={{
                    width: 'intrinsic',
                    height: 'intrinsic',
                  }}
                  style={{ fill: '#ffffff', fontSize: 20 }}
                  onPointerTap={() => {
                    settingStore.mode = text;
                  }}
                /> */}
              </layoutContainer>
            );
          })}
        </layoutContainer>
        <layoutContainer
          layout={{
            width: containerW,
            height: 50,
            justifyContent: "flex-start",
            alignItems: "center",

            marginBottom: 5,
            paddingLeft: 10,
            backgroundColor: "#ffffff",
            gap: 10,
          }}
        >
          <CustomText text={`fence:${countFence}`} style={{ fontSize: 20 }} />
        </layoutContainer>
        <layoutContainer
          layout={{
            width: containerW,
            flexWrap: "wrap",
            alignContent: "flex-start",
          }}
        >
          <Content />
        </layoutContainer>
        <layoutContainer
          layout={{
            width: containerW,
            justifyContent: "flex-start",
            marginTop: 5,
            gap: 5,
          }}
        >
          <layoutText
            text={"reset"}
            layout={{
              width: "intrinsic",
              height: "intrinsic",
              backgroundColor: "#0000ff",
              padding: 2,
            }}
            style={{ fill: "#ffffff", fontSize: 20 }}
            onPointerTap={() => {
              permanentFenceKeySetStore.clear();
            }}
          />
          <layoutText
            text={"check closure"}
            layout={{
              width: "intrinsic",
              height: "intrinsic",
              backgroundColor: "#ff0000",
              padding: 2,
            }}
            style={{ fill: "#ffffff", fontSize: 20 }}
            onPointerTap={() => {
              type Point = { x: number; y: number };
              const pointSet = new Set();
              Array.from(permanentFenceKeySetStore).map((v) => {
                const match = v.match(/(\d)-(\d)-(\w)/);
                if (match) {
                  const x = Number.parseInt(match[1]);
                  const y = Number.parseInt(match[2]);
                  const type = match[3];
                  if (type == "H") {
                    pointSet.add(`${x}-${y}`);
                    pointSet.add(`${x + 1}-${y}`);
                  } else if (type == "V") {
                    pointSet.add(`${x}-${y}`);
                    pointSet.add(`${x}-${y + 1}`);
                  }
                }
              });
              const getStartPoint = () => {
                for (let x = 0; x < 6; x++) {
                  for (let y = 0; y < 4; y++) {
                    if (pointSet.has(`${x}-${y}`)) return { x, y };
                  }
                }
                return false;
              };
              const pathSet = new Set();
              const startPoint = getStartPoint();
              const findShortPoint = (
                startPoint: Point,
                currentPoint: Point,
              ) => {
                const pointArray = [
                  {
                    x: currentPoint.x + 1,
                    y: currentPoint.y,
                    path: `${currentPoint.x}-${currentPoint.y}-H`,
                  },
                  {
                    x: currentPoint.x,
                    y: currentPoint.y + 1,
                    path: `${currentPoint.x}-${currentPoint.y}-V`,
                  },
                  {
                    x: currentPoint.x - 1,
                    y: currentPoint.y,
                    path: `${currentPoint.x - 1}-${currentPoint.y}-H`,
                  },
                  {
                    x: currentPoint.x,
                    y: currentPoint.y - 1,
                    path: `${currentPoint.x}-${currentPoint.y - 1}-V`,
                  },
                ].filter(({ x, y, path }) => {
                  return pointSet.has(`${x}-${y}`) && !pathSet.has(path);
                });
                if (!pointArray.length) return false;
                let min = -1;
                let resultPoint = { x: 0, y: 0 };
                pointArray.map(({ x, y }) => {
                  const result =
                    (x - startPoint.x) ** 2 + (y - currentPoint.y) ** 2;
                  if (min == -1) {
                    min = result;
                    resultPoint = { x, y };
                  } else if (min > result) {
                    min = result;
                    resultPoint = { x, y };
                  }
                });
                const type = resultPoint.x == currentPoint.x ? "V" : "H";
                let x = currentPoint.x;
                let y = currentPoint.y;
                if (type == "V") {
                  if (resultPoint.x < currentPoint.x) x = resultPoint.x;
                }
                if (type == "H") {
                  if (resultPoint.y < currentPoint.y) y = resultPoint.y;
                }
                pathSet.add(`${x}-${y}-${type}`);
                return resultPoint;
              };
              if (startPoint) {
                let currentPoint = startPoint;

                const walkPointArray = [startPoint];
                for (let i = 0; i < 10; i++) {
                  const shortPoint = findShortPoint(startPoint, currentPoint);
                  if (!shortPoint) break;

                  currentPoint = shortPoint;
                  walkPointArray.push(currentPoint);
                }
                console.log(walkPointArray, pathSet);
              }
            }}
          />
        </layoutContainer>
      </LayoutResizer>
    </Application>
  );
}
