import "@pixi/layout";
import "@pixi/layout/react";
import { useSnapshot } from "valtio";
import { fenceBase, squareBase } from "./config";
import { ModeArray } from "#schema/ModeSchema";
import { permanentFenceKeySetStore } from "#store/permanentFenceKeySetStore";
import { settingStore } from "#store/settingStore";
import { permanentPlaceKeyMapStoreReset } from "#store/permanentPlaceKeyMapStore";
import { AppContainer } from "#component/AppContainer";
import { Content } from "#component/Content";
import { extend } from "@pixi/react";
import { LayoutContainer } from "@pixi/layout/components";
import { CustomText } from "#component/CustomText";

extend({ LayoutContainer });

export function App({ el }: { el?: HTMLElement }) {
  const $settingStore = useSnapshot(settingStore);
  const containerW = squareBase * 5 + fenceBase * (5 + 1);
  const $permanentFenceKeySetStore = useSnapshot(permanentFenceKeySetStore);
  return (
    <AppContainer
      el={el}
      render={({ w, h }) => {
        console.log(w, h);
        return (
          <>
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
              <CustomText
                text={`fence:${$permanentFenceKeySetStore.size}`}
                style={{ fontSize: 20 }}
              />
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
                  permanentPlaceKeyMapStoreReset();
                }}
              />
              {/* <layoutText
            text={"check closure"}
            layout={{
              width: "intrinsic",
              height: "intrinsic",
              backgroundColor: "#ff0000",
              padding: 2,
            }}
            style={{ fill: "#ffffff", fontSize: 20 }}
            onPointerTap={() => {
              const closureFenceArray = closureCheck(permanentFenceKeySetStore);
              if (closureFenceArray) {
                for (let i = 0; i < closureFenceArray.length; i++) {
                  const patureSet = fenchToPastures(closureFenceArray[i]);
                  console.log(patureSet);
                }
              } else {
                console.log("it's not closure");
              }
            }}
          /> */}
            </layoutContainer>
          </>
        );
      }}
    />
  );
}
