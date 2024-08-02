import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import type { ColorValue } from 'react-native';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const DotSvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      fill={props.color ?? '#000'}
      d="M12 9.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5Z"
    />
  </Svg>
);

export default DotSvgIcon;
