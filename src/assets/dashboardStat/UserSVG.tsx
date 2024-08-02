import { colors } from "@src/globals/colors";
import * as React from "react";
import { ColorValue } from "react-native";
import Svg, { Path, Ellipse, Mask, G, SvgProps } from "react-native-svg";
interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const UserSVG = (props: ISvgProps) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={props?.size ?? 128}
    height={props?.size ?? 128}
    fill={colors.primary}
    viewBox="0 0 128 128"
    {...props}
  >
    <Path d="M64 27c-12.7 0-23 10.3-23 23s10.3 23 23 23 23-10.3 23-23-10.3-23-23-23zm0 6c9.4 0 17 7.6 17 17s-7.6 17-17 17-17-7.6-17-17 7.6-17 17-17zm0 48c-16.4 0-31.6 8.9-39.7 23.1-.8 1.4-.3 3.3 1.2 4.1.5.3 1 .4 1.5.4 1 0 2.1-.5 2.6-1.5C36.6 94.7 49.8 87 64 87s27.4 7.7 34.5 20.1c.8 1.4 2.6 1.9 4.1 1.1 1.4-.8 1.9-2.6 1.1-4.1C95.6 89.9 80.4 81 64 81z" />
  </Svg>
);
export default UserSVG;
