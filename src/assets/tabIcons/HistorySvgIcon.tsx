import * as React from "react";
import Svg, { SvgProps, Path } from "react-native-svg";
import type { ColorValue } from "react-native";

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const HistorySvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 24}
    fill="none"
    viewBox="0 0 50 50"
    {...props}
  >
    <Path
      fill={props.color ?? "#000"}
      d="M 11 3 A 1.0001 1.0001 0 0 0 10 4 L 10 8 L 9 8 A 1.0001 1.0001 0 0 0 8 9 L 8 13 L 7 13 A 1.0001 1.0001 0 0 0 6 14 L 6 29 L 4 29 A 1.0001 1.0001 0 0 0 3 30 L 3 46 A 1.0001 1.0001 0 0 0 4 47 L 46 47 A 1.0001 1.0001 0 0 0 47 46 L 47 30 A 1.0001 1.0001 0 0 0 46 29 L 44 29 L 44 14 A 1.0001 1.0001 0 0 0 43 13 L 42 13 L 42 9 A 1.0001 1.0001 0 0 0 41 8 L 40 8 L 40 4 A 1.0001 1.0001 0 0 0 39 3 L 11 3 z M 12 5 L 38 5 L 38 8 L 12 8 L 12 5 z M 10 10 L 10.832031 10 A 1.0001 1.0001 0 0 0 11.158203 10 L 38.832031 10 A 1.0001 1.0001 0 0 0 39.158203 10 L 40 10 L 40 13 L 10 13 L 10 10 z M 8 15 L 8.8320312 15 A 1.0001 1.0001 0 0 0 9.1582031 15 L 40.832031 15 A 1.0001 1.0001 0 0 0 41.158203 15 L 42 15 L 42 29 L 31 29 A 1.0001 1.0001 0 0 0 30 30 C 30 32.773666 27.773666 35 25 35 C 22.226334 35 20 32.773666 20 30 A 1.0001 1.0001 0 0 0 19 29 L 8 29 L 8 15 z M 5 31 L 18.203125 31 C 18.709475 34.363146 21.49988 37 25 37 C 28.50012 37 31.290525 34.363146 31.796875 31 L 45 31 L 45 45 L 5 45 L 5 31 z"
    />
  </Svg>
);

export default HistorySvgIcon;
