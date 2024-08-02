import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import type { ColorValue } from 'react-native';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const LogoutSVGIcon = (props: ISvgProps) => (
  <Svg width={props.size ?? 25} height={props.size ?? 25} {...props}>
    <Path
      fill={props.color ?? colors.primary}
      d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h7v2H5v14h7v2H5Zm11-4-1.375-1.45 2.55-2.55H9v-2h8.175l-2.55-2.55L16 7l5 5-5 5Z"
    />
  </Svg>
);

export default LogoutSVGIcon;
