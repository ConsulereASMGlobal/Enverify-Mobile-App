import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput, FlatList } from 'react-native';
import { Spacer } from '../../../components/common/Spacer';
import { FastImage } from '../../../components/image';
import { TextField } from '../../../components/TextField/TextField';
import { colors } from '../../../globals/colors';
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE
} from '../../../globals/themes';
import { RegisterFormContainer } from '../../../container/formContainer/RegisterFormContainer';
import Button from '../../../components/Button/Button';
import { DynamicIcon } from '../../../utils/Dynamic/DynamicIcon';
import { ValidationInput } from '../../../components/Input/ValidationInput';
import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { collectorSchema } from '../../../static/schema/ValidationSchema';
import toast from '../../../services/toast/index';

interface Props {}
type InputProps = {
  storeName: string;
};

const data = [
  { id: 1, name: 'GCASH', isChecked: false, accountNo: '', accountName: '' },
  { id: 2, name: 'MAYA', isChecked: false, accountNo: '', accountName: '' },
  {
    id: 3,
    name: 'BANK TRANSFER',
    isChecked: false,
    accountNo: '',
    accountName: ''
  }
];
export const WalletInformation = ({ navigation, route }: Props) => {
  const { regdata } = route.params;
  console.log(regdata);
  const [selectStore, setSelectStore] = useState(true);
  const [selectPerson, setSelectPerson] = useState(false);
  const [wallets, setWallets] = useState(data);
  const formOptions = {
    resolver: yupResolver(collectorSchema)
  };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);

  const handleChange = id => {
    let temp = wallets.map(wallet => {
      if (id === wallet.id) {
        return { ...wallet, isChecked: !wallet.isChecked };
      }
      return wallet;
    });
    setWallets(temp);
  };

  let selected = wallets.filter(product => product.isChecked);

  console.log(selected, 'csd');
  const onSubmit: SubmitHandler<InputProps> = async data => {
    console.log(selected, 'hell');
    if (selected.length < 1) {
      return toast.danger({ message: 'Please select transfer method!' });
    }
    navigation.navigate('walletDetailInformation', {
      regdata: {
        ...regdata,
        wallet: selected
      },
      selectedCheckboxes: selected
    });
  };
  const renderFlatList = renderData => {
    return (
      <FlatList
        data={renderData}
        renderItem={({ item }) => (
          <View style={{ margin: 5 }}>
            <View
              style={{
                flexDirection: 'row',
                flex: 1,
                alignItems: 'center'
              }}>
              <Pressable onPress={() => handleChange(item.id)}>
                <DynamicIcon
                  iconName={
                    item.isChecked
                      ? 'checkbox-marked'
                      : 'checkbox-blank-outline'
                  }
                  iconSize={24}
                  iconColor={colors.primary}
                  iconFamily="MaterialCommunityIcons"
                />
              </Pressable>
              <TextField style={{ marginLeft: 5 }}>{item?.name}</TextField>
            </View>
          </View>
        )}
      />
    );
  };

  return (
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
              backgroundColor: colors.grayTwo
            }}
          />
        </View>
        <Spacer spacing={20} />

        <View>
          <TextField
            style={{ fontWeight: 'bold', fontSize: 20, lineHeight: 22 }}>
            Collection Centre Application
          </TextField>
          <Spacer spacing={7} />
          <TextField style={{ color: colors.gray }}>
            Join our community of collectors.
          </TextField>
          <Spacer spacing={20} />
          <TextField
            style={{
              fontWeight: 'bold',
              color: colors.secondary
            }}>
            Wallet Information
          </TextField>
          <Spacer spacing={3} />
          <TextField style={{ color: colors.gray }}>
            How will you receive incentives?
          </TextField>
          <Spacer spacing={20} />
        </View>
        <View style={{ width: '100%' }}>
          <TextField style={{ color: colors.dark }}>
            Transfer Methods*
          </TextField>
          <TextField style={{ color: colors.gray, fontSize: 12 }}>
            Choose at least one
          </TextField>
          <View style={{}}>{renderFlatList(wallets)}</View>
          <Button
            textStyle={{ lineHeight: 18 }}
            onPress={handleSubmit(onSubmit)}
            title={'Next'}
          />
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
        </View>
        <Spacer spacing={10} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    width: '100%',
    borderWidth: 2,
    padding: 10,
    height: 56,
    borderColor: '#f2f2f2',
    color: colors.neutral_dark,
    backgroundColor: colors.white,
    borderRadius: BORDER_RADIUS_SIZE,
    paddingHorizontal: MEDIUM_PADDING_SIZE,
    shadowColor: '##F0FFFFFF',
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0.15,
    shadowRadius: 3.84,
    elevation: 0.5
  },
  imageStyle: {
    height: 70,
    width: 180
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center',
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
  }
});
