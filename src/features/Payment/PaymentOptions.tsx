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

interface PaymentOptionProps {
  onRequestClose: () => void;
  bottomContent?: React.ReactNode;
  setPayment: React.Dispatch<React.SetStateAction<string>>;
}

export default function PaymentOption({
  onRequestClose,
  bottomContent = <></>,
  setPayment
}: PaymentOptionProps) {
  const [selectedItem, setSelectedItem] = useState(2);
  return (
    <View style={styles.modalContainer}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextField
            style={{
              color: colors.primary,
              fontSize: 16,
              fontWeight: 'bold',
              textAlign: 'center'
            }}>
            Choose payment Option
          </TextField>
          <Spacer spacing={9} />
          <View style={globalStyle.row}>
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(1);
                setPayment('WALLET');
              }}
              style={{
                ...styles.iconButton,
                borderColor: selectedItem == 1 ? colors.primary : 'transparent'
              }}>
              <Image
                source={require('../../assets/payment/online.png')}
                style={styles.Icon}
                resizeMode="contain"
              />
              <Spacer spacing={10} />
              <TextField style={styles.text}>Wallet</TextField>
            </TouchableOpacity>
            <Spacer spacing={5} />
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(2);
                setPayment('CASH');
              }}
              style={{
                ...styles.iconButton,
                borderColor: selectedItem == 2 ? colors.primary : 'transparent'
              }}>
              <Image
                source={require('../../assets/payment/cash.png')}
                style={styles.Icon}
                resizeMode="contain"
              />
              <Spacer spacing={10} />
              <TextField style={styles.text}>Cash</TextField>
            </TouchableOpacity>
            <Spacer spacing={5} />
            <TouchableOpacity
              onPress={() => {
                setSelectedItem(3);
                setPayment('DONATION');
              }}
              style={{
                ...styles.iconButton,
                borderColor: selectedItem == 3 ? colors.primary : 'transparent'
              }}>
              <Image
                source={require('../../assets/payment/donation.png')}
                style={styles.Icon}
                resizeMode="contain"
              />
              <Spacer spacing={5} />
              <TextField style={styles.text}>Donation</TextField>
            </TouchableOpacity>
          </View>
          <Spacer spacing={5} />
          {bottomContent && bottomContent}
          {/* <Button
          onPress={onRequestClose}
          title={'Make Payment'}
          textStyle={{
            textAlign: 'center',
            width: '90%'
          }}
          style={{ width: '80%' }}
        /> */}
          <Spacer spacing={5} />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust the opacity here (0.5 means 50% transparency)
  },
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
    paddingBottom: XLARGE_PADDING_SIZE,
    alignItems: 'center'
  },
  buttonStyle: {
    width: '95%',
    alignSelf: 'center',
    textAlign: 'center'
  }
});
