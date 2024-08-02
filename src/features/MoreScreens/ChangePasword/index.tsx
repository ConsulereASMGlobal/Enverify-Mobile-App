import { StyleSheet, View } from 'react-native';
import React, { useState } from 'react';
import { Spacer } from '../../../components/common/Spacer';
import { ValidationInput } from '../../../components/Input/ValidationInput';
import Button from '../../../components/Button/Button';
import { LoadingIndicator } from '../../../components/LoadingIndicator';
import { colors } from '../../../globals/colors';
import {
  BORDER_RADIUS_SIZE,
  MEDIUM_PADDING_SIZE,
  REGULAR_PADDING_SIZE
} from '../../../globals/themes';
import store, { persistor, useAppDispatch } from '../../../redux/store';
import { yupResolver } from '@hookform/resolvers/yup';
import { changePasswordSchema } from '../../../static/schema/ValidationSchema';
import { useForm, SubmitHandler } from 'react-hook-form';
import { authActions } from '../../../redux/actions/combineAction';
import { useNavigation } from '@react-navigation/native';
import CongratulationsModal from '../../../components/CongratulationsModal/CongratulationsModal';
import CongratulationScreen from '../../CongratulationScreen/CongratulationScreen';
import { globalStyle } from '../../../globals/globalStyles';
import { passwordAPI } from '../../../services/api';
import toast from '../../../services/toast/index';

type InputProps = {
  oldPassword: string;
  password: string;
};
export const ChangePasword = () => {
  const formOptions = { resolver: yupResolver(changePasswordSchema) };
  const dispatch = useAppDispatch();
  const navigation = useNavigation();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);
  // const { logging } = useSelector((state: RootState) => state.auth);

  const onSubmit: SubmitHandler<InputProps> = async data => {
    // navigation.goBack();
    // setisModalVisible(prevState => !prevState);

    // dispatch(authActions.login({ ...data, userType: 'PICKUP_POINT' }));
    setLoading(true);
    passwordAPI
      .changePassword({
        oldPassword: data?.oldPassword,
        newPassword: data?.password
      })
      .then(res => {
        setLoading(false);
        if (res === 304) {
          toast.danger({ message: 'Please check old password' });
        } else {
          setisModalVisible(prevState => !prevState);
        }
      });
  };
  const _onRequestClose = () => {
    setisModalVisible(prevState => !prevState);
    dispatch(authActions.logout());
    persistor.purge();

    // navigation.navigate('LandingStack');
  };
  return (
    <View style={styles.rootContainer}>
      <View style={styles.mainContainer}>
        <Spacer spacing={20} />
        <View style={{ width: '100%' }}>
          <ValidationInput
            placeholder="Old Password"
            label="Old Password"
            fieldName="oldPassword"
            autoCapitalize={'none'}
            secureTextEntry
            iconName="eye"
            iconFamily="Feather"
            {...formProps}
          />
          <ValidationInput
            placeholder="New Password"
            label="New Password"
            fieldName="password"
            autoCapitalize={'none'}
            secureTextEntry
            iconName="eye"
            iconFamily="Feather"
            {...formProps}
          />
          <ValidationInput
            placeholder="Confirm Password"
            label="Confirm Password"
            fieldName="cPassword"
            autoCapitalize={'none'}
            secureTextEntry
            iconName="eye"
            iconFamily="Feather"
            {...formProps}
          />
        </View>
        <Button
          textStyle={{ lineHeight: 18 }}
          onPress={handleSubmit(onSubmit)}
          disabled={loading}
          title={'Change Password'}>
          {loading && <LoadingIndicator activityColor="white" />}
        </Button>
        <Spacer spacing={10} />
      </View>

      <CongratulationsModal
        modalVisible={isModalVisible}
        onRequestClose={_onRequestClose}>
        <CongratulationScreen
          onRequestClose={_onRequestClose}
          heading="Password Changed"
          message={`You can login with new password.`}
          bottomContent={
            <View style={{ ...globalStyle.container }}>
              <Button
                style={{
                  width: '80%',
                  backgroundColor: colors.white,
                  borderColor: colors.primary,
                  borderWidth: 1
                }}
                textStyle={{ color: colors.primary }}
                title={'Login'}
                onPress={_onRequestClose}
              />
            </View>
          }
        />
      </CongratulationsModal>
    </View>
  );
};

const styles = StyleSheet.create({
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
    height: 170,
    width: 260
  },
  mainContainer: {
    width: '100%',
    alignItems: 'center'
  },
  imageLogoStyle: {
    height: 40,
    width: 150
  },
  rootContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.backgroundColor,
    paddingHorizontal: REGULAR_PADDING_SIZE
  },
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  }
});
