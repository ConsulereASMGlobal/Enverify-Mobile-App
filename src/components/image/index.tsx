import React from 'react';
import FastImg from 'react-native-fast-image';

interface Props extends React.ComponentProps<typeof FastImg> {}

export const FastImage = ({ source, ...rest }: Props) => {
  return (
    <FastImg
      resizeMode={FastImg.resizeMode.contain}
      source={source}
      {...rest}
    />
  );
};
