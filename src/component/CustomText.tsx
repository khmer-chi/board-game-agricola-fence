import type { LayoutOptions } from "@pixi/layout";
import { LayoutView } from "@pixi/layout/components";
import { extend } from "@pixi/react";
import { Text, type TextStyle, type TextStyleOptions } from "pixi.js";

extend({ Text, LayoutView });

export const CustomText = ({
  layout = {},
  text,
  style,
}: {
  layout?: Omit<LayoutOptions, "target">;
  text: string;
  style?: TextStyle | TextStyleOptions;
}) => {
  return (
    <layoutView
      layout={{
        width: "intrinsic",
        height: "intrinsic",
        ...layout,
      }}
    >
      <pixiText text={text} style={style} />
    </layoutView>
  );
};
// const CustomText1 = ({ text }: { text: string }) => {
//   return (
//     <layoutText
//       text={text}
//       style={{ fontSize: 20 }}
//       layout={{
//         width: 'intrinsic',
//         height: 'intrinsic',
//       }}
//     />
//   );
// };
