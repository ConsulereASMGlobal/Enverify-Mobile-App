import * as React from 'react';
import Svg, { SvgProps, Path } from 'react-native-svg';
import type { ColorValue } from 'react-native';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ProfileSvgIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 25}
    height={props.size ?? 24}
    fill="none"
    viewBox="0 0 24 24"
    {...props}>
    <Path
      d="M12.75 2A10 10 0 0 0 5.4 18.76a10.001 10.001 0 0 0 14.7 0A10 10 0 0 0 12.75 2Zm0 18a8 8 0 0 1-5.55-2.25 6 6 0 0 1 11.1 0A8 8 0 0 1 12.75 20Zm-2-10a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm8.91 6a8 8 0 0 0-3.91-3.38 4 4 0 1 0-6 0A8 8 0 0 0 5.84 16a7.92 7.92 0 0 1-1.09-4 8 8 0 1 1 16 0 7.92 7.92 0 0 1-1.09 4Z"
      fill={props.color ?? colors.primary}
    />
  </Svg>
);

export default ProfileSvgIcon;
