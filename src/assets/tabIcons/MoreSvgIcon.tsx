import * as React from "react";
import Svg, {
  SvgProps,
  G,
  Path,
  Circle,
  Defs,
  ClipPath,
} from "react-native-svg";
import type { ColorValue } from "react-native";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const MoreSvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 32}
    height={props.size ?? 32}
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <G clipPath="url(#a)">
      <Path fill="#fff" d="M0 0h24v24H0z" />
      <G filter="url(#b)">
        <Circle
          cx={6}
          cy={12}
          r={2}
          stroke={props?.color ?? "#000"}
          strokeLinejoin="round"
        />
      </G>
      <G filter="url(#c)">
        <Circle
          cx={12}
          cy={12}
          r={2}
          stroke={props?.color ?? "#000"}
          strokeLinejoin="round"
        />
      </G>
      <G filter="url(#d)">
        <Circle
          cx={18}
          cy={12}
          r={2}
          stroke={props?.color ?? "#000"}
          strokeLinejoin="round"
        />
      </G>
    </G>
    <Defs>
      <ClipPath id="a">
        <Path fill="#fff" d="M0 0h24v24H0z" />
      </ClipPath>
    </Defs>
  </Svg>
);

export default MoreSvgIcon;
