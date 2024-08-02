import * as React from 'react';
import type { ColorValue } from 'react-native';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}

const RecordsSvg = (props: ISvgProps) => {
  return (
    <Svg
      fill="none"
      viewBox="0 0 15 15"
      width={props.size ?? 22}
      height={props.size ?? 22}
      {...props}>
      <Path
        fill={props.color ?? colors.primary}
        fillRule="evenodd"
        d="M0 1.5A.5.5 0 01.5 1h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4 3A.5.5 0 01.5 7h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5zm0 3a.5.5 0 01.5-.5h7a.5.5 0 010 1h-7a.5.5 0 01-.5-.5zm-4 3a.5.5 0 01.5-.5h2a.5.5 0 010 1h-2a.5.5 0 01-.5-.5zm4 0a.5.5 0 01.5-.5h10a.5.5 0 010 1h-10a.5.5 0 01-.5-.5z"
        clipRule="evenodd"
      />
    </Svg>
  );
};

export default RecordsSvg;
