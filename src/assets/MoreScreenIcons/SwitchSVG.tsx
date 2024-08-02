import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import type { ColorValue } from "react-native";
import { colors } from "@src/globals/colors";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const SwitchSVG = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 22}
    height={props.size ?? 22}
    fill={props.color ?? colors.primary}
    viewBox="0 0 24 24"
    {...props}
  >
    <Path
      stroke={props.color ?? colors.primary}
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      fill={props.color ?? colors.primary}
      d="M4 17h16m0 0-4-4m4 4-4 4m4-14H4m0 0 4-4M4 7l4 4"
    />
  </Svg>
);
export default SwitchSVG;
