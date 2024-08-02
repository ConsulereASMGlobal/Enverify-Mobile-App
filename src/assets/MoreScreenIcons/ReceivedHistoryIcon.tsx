import * as React from 'react';
import Svg, { SvgProps, Defs, Path, Circle } from 'react-native-svg';
import { StyleSheet, type ColorValue } from 'react-native';
import { colors } from '@src/globals/colors';

interface ISvgProps extends SvgProps {
  size?: number;
  color?: ColorValue;
}
const ReceivedHistoryIcon = (props: ISvgProps) => (
  <Svg
    width={props.size ?? 22}
    height={props.size ?? 22}
    stroke="#000"
    viewBox="0 0 512 512"
    {...props}>
    <Path
      fill={props.color ?? colors.primary}
      d="M137.8 70c-6.3 1.1-14.3 5.6-17.7 9.9-6 7.6-6.5 9.6-6.9 24.8l-.4 14.2-5.6 1.6c-12.5 3.7-18.1 7.9-33 25.3-6.3 7.4-8.9 8.8-16.9 9.7l-6.1.7-4.8-5c-3.2-3.3-6.3-5.4-8.9-6.1-5.4-1.5-17.8-1.4-22.9.1-5.3 1.6-12.1 8.4-13.5 13.4-.7 2.5-1.1 21.3-1.1 53.2 0 53.7 0 53.4 5.8 59.5 5.1 5.4 9.1 6.7 20.3 6.7 11.9 0 17.2-1.9 21.5-7.6l2.6-3.4h22.9l15.4 6c8.5 3.3 15.7 6 16.2 6 .4 0 2.5.5 4.5 1l3.7 1.1.3 70.2.3 70.2 2.3 4.2c3.2 6 8.6 11.1 15.1 14.2l5.6 2.6h119c137.6 0 125.5.9 136-10 5.1-5.3 6.8-6.4 11.5-7.5 3-.7 12.2-3.9 20.4-7.1l14.9-5.9h23.5l2.6 3.4c4.3 5.7 9.6 7.6 21.2 7.6 7.4 0 10.9-.5 13.9-1.9 5-2.2 10.1-7.9 11.5-12.8.8-2.6 1-19.6.8-54.4l-.3-50.5-2.8-4.2c-1.5-2.3-4.6-5.4-6.8-6.9-3.6-2.3-5.4-2.8-13.3-3.1-12.1-.5-16.9.8-22.5 6.4-4.2 4.2-4.6 4.4-10.3 4.4-8 0-11.9-2-18.1-9.4-13.9-16.4-21.5-22.2-32.5-25l-4.7-1.2-.5-27.1c-.5-24.8-.7-27.3-2.4-29.2-2.6-2.9-7.6-2.8-10.4.2-2.2 2.3-2.2 2.8-2.2 38.3 0 40.2-.3 41.6-7.1 46.5-3.2 2.3-4.5 2.4-21.9 3-11 .3-19.7 1.1-21.5 1.8-8.3 3.4-14.3 11.4-15.2 20.3-1.1 10.5 3.5 19.2 12.8 24.3l5.4 3 23.5.5 23.5.5v71l-2.3 3.3c-5.2 7.2 4.7 6.7-126.4 6.7H138.1l-2.8-2.1c-1.5-1.1-3.8-3.6-5-5.4l-2.3-3.3V283.5h58.7l4.9-3c9.3-5.8 13.6-17.3 10-27.4-1.5-4.4-1.5-4.5 1.4-7.8 6.4-7.2 8-14.2 5.5-22.8l-1.6-5.6 2.5-2c1.3-1 3.6-4.2 5-7.1 3.4-6.8 3.4-13.5.2-20.4l-2.4-5.2 2.9-5.7c4.6-9.1 3.6-18-2.9-25.5-6.4-7.6-5.5-7.4-44.8-8-32.8-.5-35.3-.6-37.3-2.4-2-1.8-2.1-2.8-2.1-23.6 0-20.9.1-21.8 2.3-25 1.2-1.8 3.5-4.3 5-5.4 2.8-2.1 3.3-2.1 90.2-2.4l87.3-.3.4 24.3c.3 23.8.4 24.4 2.9 29.8 3.1 6.6 8.5 12.1 14.8 15.2 4.3 2.2 6 2.3 29.4 2.6l24.7.3v12c0 6.6.5 12.9 1.1 14 1.5 2.9 5.7 4.2 9 2.9 4.4-1.9 5.1-5.2 4.7-21.7-.3-12.8-.6-15.3-2.5-18.8-2.6-4.9-68.4-70.6-73.3-73.1-3.3-1.8-7.8-1.9-92.5-2-49-.1-91.1.2-93.7.6zM352 118.5l22.5 22.6-18.2-.3c-16.5-.3-18.4-.5-20.9-2.4-6.6-4.8-6.9-5.9-7.2-25-.2-9.6 0-17.4.5-17.4.4 0 10.9 10.1 23.3 22.5zm-239 19.6c0 4.4 4.6 12.4 8.9 15.3 5.9 4 10.7 4.5 44.4 4.6h31.8l2.4 2.5c1.6 1.5 2.5 3.6 2.5 5.5s-.9 4-2.5 5.5l-2.4 2.5h-65.2l-2.4 2.5c-3 3-3.2 6.4-.4 9.9l2 2.6h31.5c33 0 36.2.4 37.8 4.5 1 2.6.6 6.9-.7 8.6-2.8 3.7-5 3.9-37.1 3.9h-31.5l-2 2.6c-2.6 3.3-2.7 6.5-.2 9.5l1.9 2.4 29.9.6c16.4.3 29.9.6 30 .7.1.1 1 1.6 1.9 3.3 1.8 3.6 1.3 7-1.6 9.9-1.9 1.9-3.5 2-29.5 2-22.3 0-28.1.3-30.4 1.5-4.6 2.3-5.4 6.6-2.1 10.8l2.1 2.6 25.5.3 25.6.3 2.4 2.8c4.2 4.9 2.1 11.7-4.2 13.3-1.3.3-14.7.4-29.7.1-33.7-.7-39.3-1.7-64.2-12.3-8.5-3.6-9.8-3.8-22-4.3l-13-.6-.3-18.7-.2-18.7-2.7-2c-4.2-3.4-8.5-2.6-10.8 2-1.2 2.2-1.5 7.4-1.5 24.3 0 25.6.4 24.6-10.7 24.6C14 263 15 267.8 15 211.3S14.1 159 25.8 159c10.5 0 11.2.8 11.2 13.6 0 7.3.5 11.4 1.5 13.3 2.3 4.6 6.6 5.4 10.9 2 2.4-1.9 2.6-2.7 2.6-9.3v-7.3l8.6-1.1c11.7-1.6 17.1-4.6 24.8-14.2 9.6-11.7 12.7-14.8 18.6-18 7.2-3.9 9-3.9 9 .1zm298 146.7c3 2.1 8.8 7.8 13 12.9 11.2 13.8 15.3 16.3 27.5 17.2l8 .6v81l-13 .6c-12.9.5-13.1.5-27 6.1-7.7 3.1-15.2 6-16.7 6.3l-2.8.7v-46.3l3 2.1c8.4 6 20.8 8.3 24.9 4.6 2.7-2.4 2.8-7.9.3-10.4-1-1-4.7-2.4-8.1-3.1-6.9-1.4-11.4-5-16.3-13.3-3-4.9-8.5-9.2-14.5-11.4-2.7-.9-9.8-1.3-25.1-1.4-17.2 0-22-.3-24.7-1.5-4.9-2.4-6.7-7.7-4.4-12.8 2.1-4.6 4.2-5.2 23.9-5.7 16.4-.5 19-.8 22.6-2.7 9.6-5.1 15.6-12.8 17.5-22.5 1.1-5.7 1.3-5.9 3.8-5.3 1.4.3 5.1 2.3 8.1 4.3zm84 21.2c1.9 1.9 2 3.3 2 49.8 0 41.6-.2 48-1.6 50-1.3 1.9-2.4 2.2-9.1 2.2-12.3 0-11.3 4.8-11.3-51.8 0-43.8.2-48.7 1.7-50.4 2.5-2.7 15.5-2.6 18.3.2z"
    />
    <Path
      fill={props.color ?? colors.primary}
      d="M158.3 340.6c-2 2-2.4 3.1-1.9 5.7 1.3 6.4 0 6.2 40.6 6.2s39.3.2 40.6-6.2c.5-2.6.1-3.7-1.9-5.7l-2.6-2.6h-72.2l-2.6 2.6zM159.1 370.7c-1.1 1-2.4 3.2-2.7 5-.5 2.6-.1 3.7 1.9 5.7l2.6 2.6h72.2l2.6-2.6c2-2 2.4-3.1 1.9-5.7-1.3-6.8-.9-6.7-40.6-6.7-32.6 0-36 .2-37.9 1.7z"
    />
  </Svg>
);

export default ReceivedHistoryIcon;
