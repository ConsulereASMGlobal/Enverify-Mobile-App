import { colors } from '@src/globals/colors';
import { BORDER_RADIUS_SIZE } from '@src/globals/themes';
import React from 'react';
import { View } from 'react-native';

interface Props {
  count?: number;
  bgcolors?: any;
  borderRadius?: number;
}
const DynamicSteps = ({
  count = 0,
  bgcolors = colors.secondary,
  borderRadius = BORDER_RADIUS_SIZE
}: Props) => {
  // Create an array with the specified count
  const viewsArray = Array.from({ length: count }, (_, index) => index);

  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%'
      }}>
      {/* Map through the array to generate dynamic views */}
      {viewsArray.map((_, index) => (
        <View
          key={index}
          style={{
            flex: 0.4,
            marginHorizontal: 5,
            height: 20,
            borderRadius: borderRadius,
            backgroundColor: bgcolors
          }}
        />
      ))}
    </View>
  );
};

export default DynamicSteps;
