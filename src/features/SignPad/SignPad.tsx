import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  Pressable,
  View,
  TouchableOpacity,
  Image
} from 'react-native';

import { colors } from '../../globals/colors';

import {
  Fonts,
  REGULAR_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  XLARGE_PADDING_SIZE
} from '../../globals/themes';
import { TextField } from '../../components/TextField/TextField';
import { globalStyle } from '../../globals/globalStyles';
import { Spacer } from '../../components/common/Spacer';
import FastImage from 'react-native-fast-image';
import Button from '../../components/Button/Button';
import { DynamicIcon } from '../../utils/Dynamic/DynamicIcon';

interface PaymentOptionProps {
  onRequestClose: () => void;
  onRequestConfirm: () => void;
}

export default function SignPadModal({
  onRequestConfirm,
  onRequestClose
}: PaymentOptionProps) {
  const [selectedItem, setSelectedItem] = useState(2);
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <TextField
          style={{
            color: colors.dark,
            fontSize: 16,
            textAlign: 'center'
          }}>
          Signature
        </TextField>
        <Spacer spacing={9} />

        <View
          style={{
            borderWidth: 1,
            paddingVertical: 25,
            paddingHorizontal: 100,
            borderRadius: 7,
            borderColor: colors.gray
          }}>
          <View>
            <DynamicIcon
              iconName="draw"
              iconFamily="MaterialCommunityIcons"
              iconSize={70}
            />
          </View>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Button
            onPress={onRequestClose}
            title={'Cancel'}
            textStyle={{
              textAlign: 'center',
              width: '90%',
              color: colors.gray
            }}
            style={{ width: '47%', backgroundColor: 'transparent' }}
          />
          <Spacer spacing={10} />
          <Button
            onPress={onRequestConfirm}
            title={'Confirm'}
            textStyle={{
              textAlign: 'center',
              width: '90%'
            }}
            style={{ width: '47%' }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
    // backgroundColor: '#00000050'
  },
  text: {
    color: colors.gray,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  iconButton: {
    borderRadius: 8,
    padding: 8,
    borderWidth: 2,
    borderColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  Icon: {
    height: 50,
    width: 60
  },
  modalView: {
    marginHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: 'white',
    borderRadius: 8,
    paddingVertical: 20,
    paddingHorizontal: 34,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    // paddingBottom: XLARGE_PADDING_SIZE,
    alignItems: 'center'
  },
  buttonStyle: {
    width: '95%',
    alignSelf: 'center',
    textAlign: 'center'
  }
});
