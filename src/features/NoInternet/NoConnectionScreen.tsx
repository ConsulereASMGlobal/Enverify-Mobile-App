import React from 'react';
import { View, StyleSheet } from 'react-native';
import { colors } from '../../globals/colors';
import { TextField } from '../../components/TextField/TextField';
import { FastImage } from '../../components/image/index';
import { Spacer } from '../../components/common/Spacer';

export const NoConnectionScreen = () => {
  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <FastImage
          source={require('../../assets/nowifi.png')}
          style={{ height: 75, width: 75 }}
        />
        <Spacer spacing={20} />
        <TextField style={styles.text}>
          Please check your internet connection
        </TextField>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.white
  },
  image: {
    width: 200,
    height: 200,
    resizeMode: 'contain'
  },
  text: {}
});
