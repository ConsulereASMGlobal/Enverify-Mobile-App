import * as React from 'react';
import Svg, { SvgProps, Defs, Path, Circle } from 'react-native-svg';
import { StyleSheet, type ColorValue } from 'react-native';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ProductionReportIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 22}
    height={props.size ?? 22}
    fill="none"
    viewBox="0 0 490 490"
    {...props}>
    <Path
      fill={props.color ?? colors.primary}
      d="M480 325h-5V45c0-5.523-4.477-10-10-10H300V10c0-5.523-4.477-10-10-10h-90c-5.523 0-10 4.477-10 10v25H25c-5.523 0-10 4.477-10 10v280h-5c-5.523 0-10 4.477-10 10v35c0 5.523 4.477 10 10 10h152.338l-50.913 84.855 17.149 10.29L185.662 380H235v110h20V380h49.338l57.087 95.145 17.149-10.29L327.662 380H480c5.523 0 10-4.477 10-10v-35c0-5.523-4.477-10-10-10zM210 20h70v15h-70V20zM35 55h420v270H35V55zm435 305H20v-15h450v15z"
    />
    <Path
      fill={props.color ?? colors.primary}
      d="M170 90c-55.14 0-100 44.86-100 100s44.86 100 100 100 100-44.86 100-100S225.14 90 170 90zm0 180c-44.112 0-80-35.888-80-80 0-40.724 30.593-74.413 70-79.353V190c0 5.523 4.477 10 10 10h79.353c-4.94 39.407-38.629 70-79.353 70zm10-90v-69.353c36.128 4.529 64.824 33.225 69.353 69.353H180zM345 130h70v20h-70zM345 160h70v20h-70zM345 190h70v20h-70zM345 100h45v20h-45zM324.999 119.999v-20h-45a10.001 10.001 0 0 0-7.071 2.929l-15 15 14.143 14.143 12.07-12.072h40.858zM310 235h115v20H310zM280 270h145v20H280z"
    />
  </Svg>
);

export default ProductionReportIcon;
