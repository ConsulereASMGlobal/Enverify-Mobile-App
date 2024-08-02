import * as React from 'react';
import type { ColorValue } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const DashboardSvg = (props: ISvgProps) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 24 24"
      width={props.size ?? 22}
      height={props.size ?? 22}
      {...props}>
      <Path
        fill={props.color ?? colors.primary}
        d="M5 22a1 1 0 01-1-1v-8a1 1 0 012 0v8a1 1 0 01-1 1zm5 0a1 1 0 01-1-1V3a1 1 0 012 0v18a1 1 0 01-1 1zm5 0a1 1 0 01-1-1V9a1 1 0 012 0v12a1 1 0 01-1 1zm5 0a1 1 0 01-1-1v-4a1 1 0 012 0v4a1 1 0 01-1 1z"
      />
    </Svg>
  );
};

export default DashboardSvg;
