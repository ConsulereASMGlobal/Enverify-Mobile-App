import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, TextInput } from 'react-native';
import { Spacer } from '../../../components/common/Spacer';
import { FastImage } from '../../../components/image';
import { TextField } from '../../../components/TextField/TextField';
import { colors } from '../../../globals/colors';
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE
} from '../../../globals/themes';
import Button from '../../../components/Button/Button';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import toast from '../../../services/toast/index';
import { banks } from './bankList';
import { DropDown } from '../../../components/Dropdown/DropDown';
import { BottomModalActions } from '../../../redux/actions/combineAction';

export const WalletDetailInformation = ({ navigation, route }: any) => {
  const { regdata, selectedCheckboxes } = route.params;
  console.log(regdata, 'from flow');
  const dispatch = useDispatch();
  const { logging } = useSelector((state: RootState) => state.auth);

  const [openProForm, setOpenProForm] = useState(false);

  const formProItems = banks;
  const [isProDropFocus, setIsProDropFocus] = useState(false);
  const [bank, setBank] = useState();

  const onSubmit = () => {
    if (Object.entries(formData).length < 1) {
      toast.danger({ message: 'Please fill the form' });
      return;
    }
    let error;
    selectedCheckboxes.forEach(checkbox => {
      if (error) {
        return;
      }
      if (checkbox?.isChecked) {
        if (!formData[checkbox?.name]?.accountName) {
          error = `Please fill ${checkbox?.name} account name`;
        }
        if (!formData[checkbox?.name]?.accountNo) {
          error = `Please fill ${checkbox?.name} account number`;
        }
        if (checkbox?.name === 'BANK TRANSFER') {
          if (!bank) {
            error = `Please select bank`;
          }
        }
      }
    });
    if (error) {
      toast.danger({ message: error });
      return;
    }
    const payment = selectedCheckboxes.map(checkbox => {
      const datas = formData[checkbox?.name];
      return {
        type:
          checkbox?.name === 'BANK TRANSFER' ? 'BANK_TRANSFER' : checkbox?.name,
        mobile: datas?.accountNo ?? '',
        accountNo: datas?.accountNo ?? '',
        bankName: checkbox?.name === 'BANK TRANSFER' ? bank : '',
        accountName: datas?.accountName ?? ''
      };
    });

    navigation.navigate('lastStep', {
      regdata: {
        ...regdata,
        paymetAccepted: payment
      }
    });
  };
  const [formData, setFormData] = useState({});
  console.log(formData, 'payment method');
  const handleInputChange = (checkbox, key, value) => {
    setFormData(prevData => ({
      ...prevData,
      [checkbox]: {
        ...prevData[checkbox],
        [key]: value
      }
    }));
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{ flex: 1, backgroundColor: colors.white }}>
      <View style={styles.rootContainer}>
        <View style={styles.mainContainer}>
          <Spacer spacing={10} />
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: '100%'
            }}>
            <View
              style={{
                flex: 0.2,
                marginHorizontal: 5,
                height: 10,
                borderRadius: BORDER_RADIUS_SIZE,
                backgroundColor: colors.primary
              }}
            />
            <View
              style={{
                flex: 0.2,
                marginHorizontal: 5,
                height: 10,
                borderRadius: BORDER_RADIUS_SIZE,
                backgroundColor: colors.primary
              }}
            />
            <View
              style={{
                flex: 0.2,
                marginHorizontal: 5,
                height: 10,
                borderRadius: BORDER_RADIUS_SIZE,
                backgroundColor: colors.primary
              }}
            />
            <View
              style={{
                flex: 0.2,
                marginHorizontal: 5,
                height: 10,
                borderRadius: BORDER_RADIUS_SIZE,
                backgroundColor: colors.primary
              }}
            />
            <View
              style={{
                flex: 0.2,
                marginHorizontal: 5,
                height: 10,
                borderRadius: BORDER_RADIUS_SIZE,
                backgroundColor: colors.primary
              }}
            />
          </View>
          <Spacer spacing={20} />

          <View>
            <TextField
              style={{
                fontWeight: 'bold',
                fontSize: 20,
                lineHeight: 22
              }}>
              Collection Centre Application
            </TextField>
            <Spacer spacing={7} />
            <TextField style={{ color: colors.gray }}>
              Join our community of collectors.
            </TextField>
            <Spacer spacing={15} />
            <TextField
              style={{
                fontWeight: 'bold',
                color: colors.secondary
              }}>
              Wallet Information
            </TextField>
            <Spacer spacing={3} />
            <TextField style={{ color: colors.gray }}>
              Please provide the details below for the method(s) you chose.
            </TextField>
            <Spacer spacing={20} />
          </View>
          <View>
            {selectedCheckboxes.map((checkbox, index) => (
              <View key={index}>
                <TextField
                  style={{
                    fontWeight: 'bold',
                    color: colors.gray
                  }}>
                  {checkbox?.name} DETAILS
                </TextField>
                <Spacer spacing={5} />
                {checkbox?.name === 'BANK TRANSFER' && (
                  <DropDown
                    placeholder="Select Bank"
                    rightIconName="sort-down"
                    setSelectedValue={setBank}
                    combineOnPress={rest =>
                      dispatch(
                        BottomModalActions.toggleBottomModal({
                          title: 'Select Bank',
                          showList: true,
                          data: formProItems,
                          ...rest
                        })
                      )
                    }
                  />
                )}
                <View style={styles.box}>
                  <TextInput
                    placeholder={`Account Name`}
                    onChangeText={text =>
                      handleInputChange(checkbox?.name, 'accountName', text)
                    }
                    style={styles.input}
                  />
                </View>
                <Spacer spacing={5} />
                <View style={styles.box}>
                  <TextInput
                    placeholder={`Account/Mobile Number`}
                    onChangeText={text =>
                      handleInputChange(checkbox?.name, 'accountNo', text)
                    }
                    style={styles.input}
                  />
                </View>
                <Spacer spacing={10} />
              </View>
            ))}
          </View>

          <Button
            textStyle={{ lineHeight: 18 }}
            // onPress={() => handleSubmitForm()}
            onPress={() => onSubmit()}
            disabled={!!logging}
            title={'Next'}>
            {!!logging && <LoadingIndicator activityColor="white" />}
          </Button>
          <Button
            onPress={() => navigation.goBack()}
            title={'Back'}
            style={{
              width: '100%',
              backgroundColor: colors.white,
              borderColor: colors.primary,
              borderWidth: 1,
              marginTop: MEDIUM_PADDING_SIZE
            }}
            textStyle={{ color: colors.primary, lineHeight: 18 }}
          />
          <Spacer spacing={10} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    top: '37%'
  },
  input: {
    width: '100%',
    borderWidth: 1,
    padding: 10,
    height: 56,
    borderColor: colors.gray,
    color: colors.neutral_dark,
    backgroundColor: colors.white,
    borderRadius: BORDER_RADIUS_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE
    // shadowColor: '##F0FFFFFF',
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // },
    // shadowOpacity: 0.15,
    // shadowRadius: 3.84,
    // elevation: 0.5
  },
  imageStyle: {
    height: 70,
    width: 180,
    alignSelf: 'center'
  },
  mainContainer: {
    width: '100%',
    paddingHorizontal: MEDIUM_PADDING_SIZE
  },
  imageLogoStyle: {
    height: 40,
    width: 150
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'center',
    backgroundColor: colors.white
    // paddingHorizontal: REGULAR_PADDING_SIZE
  },
  box: {
    borderRadius: 10,
    flexDirection: 'row',
    // paddingRight: 14,
    alignItems: 'center'
  }
});
