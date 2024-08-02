import { ScrollView, StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import {
  BORDER_RADIUS_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE,
  screenWidth
} from '../../globals/themes';
import { ValidationInput } from '../../components/Input/ValidationInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { productionBasicDataSchema } from '../../static/schema/ValidationSchema';
import { SubmitHandler, useForm } from 'react-hook-form';
import { colors } from '../../globals/colors';
import Button from '../../components/Button/Button';
import toast from '../../services/toast/index';
import { useNavigation } from '@react-navigation/native';
import { routes } from '../../navigation/routes';
import { TextField } from '../../components/TextField/TextField';
import { DropDown } from '../../components/Dropdown/DropDown';

import { BottomModalActions } from '../../redux/actions/combineAction';
import { useAppDispatch } from '../../redux/store';
import { FastImage } from '../../components/image';
import dayjs from 'dayjs';

type InputProps = {
  date: string;
  oiName: string;
};
export const ProcessScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  const formOptions = { resolver: yupResolver(productionBasicDataSchema) };

  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  const [selectedShift, setSelectedShift] = useState();

  // useEffect(() => {
  //   dispatch(shiftsActions.getShifts());
  // }, []);
  // const shifts = useSelector(selectShift);

  const shifts = {
    data: [
      {
        id: '1',
        name: 'Morning Shift'
      },
      {
        id: '2',
        name: 'Day Shift'
      }
    ]
  };
  const updatedShifts = shifts?.data?.map(obj => {
    return {
      id: obj.id,
      // label: obj.name + ' (' + obj.startTime + ' to ' + obj.endTime + ')',
      label: obj.name,
      value: obj.id
    };
  });
  const onSubmit: SubmitHandler<InputProps> = async data => {
    if (!selectedShift) {
      toast.danger({ message: 'Shift is required!' });
      return;
    }

    const basicData = {
      ...data,
      shift: updatedShifts.find(item => item.id === selectedShift)
    };

    console.log(basicData, 'formatedData');

    navigation.navigate(routes.process.selectProcess, {
      basicData
    });
  };

  return (
    <View style={{ backgroundColor: colors.backgroundColor, flex: 1 }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.mainContainer}>
          <View style={{ marginVertical: 10 }}>
            <TextField
              style={{
                fontSize: 16,
                color: colors.neutral_dark,
                fontWeight: 'bold'
              }}>
              You have selected Process
            </TextField>
            <View
              style={{
                borderWidth: 1,
                borderColor: colors.primaryAlpha(0.5),
                flexDirection: 'row',
                alignItems: 'center',
                gap: 10,
                borderRadius: 12,
                marginVertical: 10,
                paddingVertical: 16,
                paddingHorizontal: 16,
                backgroundColor: colors.white
              }}>
              <View
                style={{
                  backgroundColor: colors.primaryAlpha(0.8),
                  padding: 12,
                  borderRadius: 30,
                  alignItems: 'center',
                  height: 50,
                  width: 50
                }}>
                <FastImage
                  source={require(`../../assets/img/process.png`)}
                  resizeMode="contain"
                  style={styles.imageStyle}
                />
              </View>
              <TextField
                style={{
                  fontSize: 17,
                  color: colors.neutral_dark,
                  fontWeight: 'bold'
                }}>
                Process
              </TextField>
            </View>
          </View>

          <TextField
            style={{
              marginVertical: 10,
              color: colors.dark,
              fontWeight: 'bold',
              fontSize: 16
            }}>
            Enter Basic Details
          </TextField>

          <TextField
            style={{ marginVertical: 5, color: colors.gray, fontSize: 14 }}>
            Select Date
          </TextField>

          <ValidationInput
            placeholder="Select Date"
            fieldName="date"
            editable={false}
            autoCapitalize={'none'}
            iconName={''}
            leftIconName={'calendar-month-outline'}
            leftIconFamily="MaterialCommunityIcons"
            leftIconColor={colors.gray}
            defaultValue={dayjs(new Date()).format('MMM DD, YYYY')}
            {...formProps}
          />

          <TextField
            style={{ marginVertical: 5, color: colors.gray, fontSize: 14 }}>
            Select Shift
          </TextField>

          <DropDown
            placeholder="Select Shift"
            rightIconName="sort-down"
            setSelectedValue={setSelectedShift}
            combineOnPress={rest =>
              dispatch(
                BottomModalActions.toggleBottomModal({
                  title: 'Select Shift',
                  showList: true,
                  data: updatedShifts,
                  ...rest
                })
              )
            }
          />

          <Button
            textStyle={{ lineHeight: 18 }}
            onPress={handleSubmit(onSubmit)}
            title={'Next'}
          />
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingHorizontal: REGULAR_PADDING_SIZE,
    marginVertical: 15
  },
  cameraBtn: {
    borderWidth: 1,
    width: '20%',
    paddingVertical: HALF_MEDIUM_PADDING_SIZE,
    alignItems: 'center',
    borderRadius: BORDER_RADIUS_SIZE,
    borderColor: colors.gray
  },
  imageStyle: { height: 24, width: 24 },

  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  dropdownContainer: {
    backgroundColor: colors.backgroundColor,
    borderColor: colors.primary,
    position: 'relative',
    top: -1
  },
  dropdownMainContainer: { zIndex: 9999 },
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: 'white'
  },
  pin: {
    height: 4,
    width: 50,
    backgroundColor: colors.gray,
    marginTop: 12,
    borderRadius: 10
  },
  pickConteiner: {
    height: 70,
    width: 70,
    backgroundColor: colors.white,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },

  pickOptionConteiner: {
    padding: 25,
    borderRadius: screenWidth,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
