import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import type { ColorValue } from "react-native";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const StocksSvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 24}
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <Path
      fill={props.color ?? "#000"}
      d="M 8 4 A 1.0001 1.0001 0 0 0 7 5 L 7 35 A 1.0001 1.0001 0 0 0 8 36 L 42 36 A 1.0001 1.0001 0 0 0 43 35 L 43 5 A 1.0001 1.0001 0 0 0 42 4 L 8 4 z M 9 6 L 41 6 L 41 34 L 9 34 L 9 6 z M 21 9 C 19.354545 9 18 10.354545 18 12 C 18 13.645455 19.354545 15 21 15 L 29 15 C 30.645455 15 32 13.645455 32 12 C 32 10.354545 30.645455 9 29 9 L 21 9 z M 21 11 L 29 11 C 29.554545 11 30 11.445455 30 12 C 30 12.554545 29.554545 13 29 13 L 21 13 C 20.445455 13 20 12.554545 20 12 C 20 11.445455 20.445455 11 21 11 z M 4 38 L 4 46 L 12 46 L 12 40 L 21 40 L 21 46 L 29 46 L 29 40 L 38 40 L 38 46 L 46 46 L 46 38 L 4 38 z M 6 40 L 10 40 L 10 44 L 6 44 L 6 40 z M 23 40 L 27 40 L 27 44 L 23 44 L 23 40 z M 40 40 L 44 40 L 44 44 L 40 44 L 40 40 z"
    />
  </Svg>
);

export default StocksSvgIcon;
