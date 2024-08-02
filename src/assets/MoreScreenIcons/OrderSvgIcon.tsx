import * as React from 'react';
import Svg, { SvgProps, Defs, Path, Circle } from 'react-native-svg';
import { StyleSheet, type ColorValue } from 'react-native';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const OrderSvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 22}
    height={props.size ?? 22}
    fill="none"
    viewBox="0 0 733.4 588.38"
    {...props}>
    {/* <Path
      d="M21.75 16h-14a1 1 0 0 1 0-2h10.44a3 3 0 0 0 2.91-2.27l1.65-6.49a1 1 0 0 0-.18-.86 1 1 0 0 0-.82-.38H7.51a3 3 0 0 0-2.82-2h-.94a1 1 0 0 0 0 2h.94a1 1 0 0 1 1 .76l.06.48L7.48 12a3.003 3.003 0 1 0 .27 6h.18a3 3 0 1 0 5.64 0h2.36a3 3 0 1 0 5.64 0h.18a1 1 0 0 0 0-2ZM20.47 6l-1.31 5.24a1 1 0 0 1-1 .76H9.53l-1.5-6h12.44Zm-9.72 14a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm8 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z"
      fill={props.color ?? colors.primary}
    /> */}

    <Defs></Defs>
    <Path
      d="M9 128.88h97l89 306h416l109-267H573.5"
      style={{
        strokeWidth: '29.99px',
        fill: 'none',
        stroke: props.color ?? colors.primary,
        strokeLinecap: 'round',
        strokeMiterlimit: 10
      }}
    />
    <Circle
      cx={253}
      cy={522.88}
      r={56.5}
      style={{
        strokeWidth: '29.99px',
        fill: 'none',
        stroke: props.color ?? colors.primary,
        strokeLinecap: 'round',
        strokeMiterlimit: 10
      }}
    />
    <Circle
      cx={551}
      cy={522.88}
      r={56.5}
      style={{
        strokeWidth: '29.99px',
        fill: 'none',
        stroke: props.color ?? colors.primary,
        strokeLinecap: 'round',
        strokeMiterlimit: 10
      }}
    />
    <Path
      d="M748.6 224.49a163.66 163.66 0 1 1-82.24 142"
      style={{
        strokeWidth: '29.99px',
        fill: 'none',
        stroke: props.color ?? colors.primary,
        strokeLinecap: 'round',
        strokeMiterlimit: 10
      }}
      transform="translate(-465.5 -172.62)"
    />
    <Path d="M227.62 104.16 337.06 65.6l-48.21-15.87L278.74 0l-51.12 104.16z" />
    <Path
      d="M364.5 82.38v111.48l77.58 65.85"
      style={{
        strokeWidth: '22.17px',
        fill: 'none',
        stroke: props.color ?? colors.primary,
        strokeLinecap: 'round',
        strokeMiterlimit: 10
      }}
    />
  </Svg>
);

export default OrderSvgIcon;
