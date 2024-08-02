import * as React from 'react';
import Svg, { SvgProps, Defs, Path, Circle } from 'react-native-svg';
import { StyleSheet, type ColorValue } from 'react-native';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const SupplyOrderHistoryIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 22}
    height={props.size ?? 22}
    stroke="#000"
    viewBox="0 0 512 512"
    {...props}>
    <Path
      fill={props.color ?? colors.primary}
      d="M128 132.267h-25.6V89.6a8.536 8.536 0 0 0-8.533-8.533 8.536 8.536 0 0 0-8.533 8.533v51.2a8.536 8.536 0 0 0 8.533 8.533H128c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533zM401.067 362.667c-28.237 0-51.2 22.963-51.2 51.2 0 28.237 22.963 51.2 51.2 51.2 28.237 0 51.2-22.963 51.2-51.2 0-28.237-22.964-51.2-51.2-51.2zm0 85.333c-18.825 0-34.133-15.309-34.133-34.133 0-18.825 15.309-34.133 34.133-34.133 18.825 0 34.133 15.309 34.133 34.133 0 18.824-15.309 34.133-34.133 34.133zM110.933 362.667c-28.237 0-51.2 22.963-51.2 51.2 0 28.237 22.963 51.2 51.2 51.2s51.2-22.963 51.2-51.2c0-28.237-22.963-51.2-51.2-51.2zm0 85.333C92.109 448 76.8 432.691 76.8 413.867c0-18.825 15.309-34.133 34.133-34.133s34.133 15.309 34.133 34.133c.001 18.824-15.308 34.133-34.133 34.133z"
    />
    <Path
      fill={props.color ?? colors.primary}
      d="m510.925 290.253-42.667-76.8a8.535 8.535 0 0 0-7.458-4.386H358.4a8.536 8.536 0 0 0-8.533 8.533v128H332.8V166.4c0-18.825-15.309-34.133-34.133-34.133H187.298c-4.326-47.77-44.553-85.333-93.431-85.333C42.112 46.933 0 89.045 0 140.8c0 13.875 3.106 27.017 8.533 38.878v157.389A8.536 8.536 0 0 0 0 345.6v42.667c0 2.27.896 4.437 2.5 6.042 2.517 2.5 2.526 2.492 36.028 2.466a8.526 8.526 0 0 0 8.03-5.692c9.626-27.204 35.499-45.483 64.375-45.483 28.894 0 54.758 18.287 64.384 45.508a8.53 8.53 0 0 0 8.047 5.692h140.902a8.536 8.536 0 0 0 8.533-8.533V362.667h19.994a8.533 8.533 0 0 0 5.367-1.903c12.262-9.924 27.093-15.164 42.906-15.164 28.894 0 54.758 18.287 64.384 45.508a8.53 8.53 0 0 0 8.047 5.692h29.969a8.536 8.536 0 0 0 8.533-8.533V294.4a8.5 8.5 0 0 0-1.074-4.147zM93.867 64c42.342 0 76.8 34.458 76.8 76.8s-34.458 76.8-76.8 76.8-76.8-34.458-76.8-76.8S51.524 64 93.867 64zm95.3 315.742v-.009c-13.474-30.865-44.177-51.2-78.234-51.2-34.048 0-64.742 20.326-78.225 51.183-4.437 0-10.641.008-15.642.017v-25.6a8.536 8.536 0 0 0 8.533-8.533V320h8.533c4.71 0 8.533-3.823 8.533-8.533s-3.823-8.533-8.533-8.533H25.6v-97.911c17.135 18.202 41.361 29.645 68.267 29.645 48.879 0 89.105-37.564 93.431-85.333h111.369c9.412 0 17.067 7.654 17.067 17.067v187.204c0 11.503 0 19.942.162 26.138H189.167zm211.9-153.609h54.716l33.178 59.733h-87.893v-59.733zM494.933 320H486.4c-4.71 0-8.533 3.823-8.533 8.533s3.823 8.533 8.533 8.533h8.533v42.667H479.3c-13.474-30.865-44.177-51.2-78.234-51.2-11.793 0-23.433 2.475-34.133 7.134V226.133H384V294.4a8.536 8.536 0 0 0 8.533 8.533h102.4V320z"
    />
  </Svg>
);

export default SupplyOrderHistoryIcon;