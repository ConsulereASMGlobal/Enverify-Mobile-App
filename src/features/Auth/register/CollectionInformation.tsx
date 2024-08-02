import React, { useState } from 'react';
import { View, StyleSheet, Pressable, TextInput } from 'react-native';
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
import { useAppDispatch } from '../../../redux/store';

interface Props {}
type InputProps = {
  storeName: string;
};
export const CollectionInformation = ({ navigation, route }: Props) => {
  const { regdata } = route.params;
  console.log(regdata, 'fromroute');
  const [selectStore, setSelectStore] = useState(true);
  const [selectPerson, setSelectPerson] = useState(false);
  const formOptions = {
    resolver: yupResolver(collectorSchema)
  };
  const dispatch = useAppDispatch();

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const onSubmit: SubmitHandler<InputProps> = async data => {
    if (selectStore) {
      if (!data?.storeName) {
        return toast.danger({ message: 'Store Name is required!' });
      }
    }
    const formatedData = {
      storeName: selectStore ? data?.storeName : 'n/a',
      person: selectPerson,
      store: selectStore
    };
    console.log(formatedData, 'hell');

    navigation.navigate('pickupLocation', {
      regdata: {
        ...regdata,
        ...formatedData
      }
    });
  };
  const _goBack = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainContainer}>
        <Spacer spacing={10} />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
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
        </View>
        <Spacer spacing={20} />

        <View>
          <TextField
            style={{ fontWeight: 'bold', fontSize: 20, lineHeight: 22 }}>
            Collection Centre Application
          </TextField>
          <Spacer spacing={7} />
          <TextField style={{ color: colors.gray }}>
            Join our community of collectors and start earning more.
          </TextField>
          <Spacer spacing={20} />
          <TextField
            style={{
              fontWeight: 'bold',
              color: colors.secondary
            }}>
            Collector Information
          </TextField>
          <Spacer spacing={3} />
          <TextField style={{ color: colors.gray }}>
            Will you be collecting as a store or as an individual?
          </TextField>
          <Spacer spacing={20} />
        </View>
        <View style={{ width: '100%' }}>
          <TextField style={{ color: colors.gray }}>
            Type of Collector*
          </TextField>

          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable
                onPress={() => {
                  setSelectStore(prevState => !prevState);
                  setSelectPerson(false);
                }}>
                <DynamicIcon
                  iconFamily="Ionicons"
                  iconName={
                    selectStore
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                  iconColor={colors.primary}
                />
              </Pressable>
              <Spacer spacing={2} />
              <TextField>Store</TextField>
            </View>
            <Spacer spacing={25} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Pressable
                onPress={() => {
                  setSelectPerson(prevState => !prevState);
                  setSelectStore(false);
                }}>
                <DynamicIcon
                  iconFamily="Ionicons"
                  iconName={
                    selectPerson
                      ? 'radio-button-on-outline'
                      : 'radio-button-off-outline'
                  }
                  iconColor={colors.primary}
                />
              </Pressable>
              <Spacer spacing={2} />
              <TextField>Person</TextField>
            </View>
          </View>
          {selectStore && (
            <View style={{}}>
              <ValidationInput
                placeholder="Name of Store"
                fieldName="storeName"
                autoCapitalize={'none'}
                defaultValue={selectPerson ? regdata?.storeName : ''}
                label="Name of Store*"
                {...formProps}
              />
            </View>
          )}
          <Button
            textStyle={{ lineHeight: 18 }}
            onPress={handleSubmit(onSubmit)}
            title={'Next'}
          />
          <Button
            onPress={() => _goBack()}
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
