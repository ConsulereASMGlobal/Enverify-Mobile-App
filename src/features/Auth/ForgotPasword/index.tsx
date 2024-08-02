import { StyleSheet, View, Pressable } from 'react-native';
import React, { useState } from 'react';

import { yupResolver } from '@hookform/resolvers/yup';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { ScrollContainerLayout } from '@src/components/Layouts/ScrollContainerLayout';
import TopShadowView from '../Components/TopShadowView';
import LogoContainer from '../Components/LogoContainer';
import TitleLogoView from '../Components/TitleLogoView';
import { CardLayout } from '@src/components/Layouts/CardLayout';
import { resetPasswordSchema } from '@src/static/schema/ValidationSchema';
import { passwordAPI } from '@src/services/api';
import { colors } from '@src/globals/colors';
import { ValidationInput } from '@src/components/Input/ValidationInput';
import Button from '@src/components/Button/Button';
import { LoadingIndicator } from '@src/components/LoadingIndicator';
import { Spacer } from '@src/components/common/Spacer';
import { TextBold, TextField } from '@src/components/TextField/TextField';
import CongratulationsModal from '@src/components/CongratulationsModal/CongratulationsModal';
import CongratulationScreen from '@src/features/CongratulationScreen/CongratulationScreen';
import { globalStyle } from '@src/globals/globalStyles';
import InfoScreen from '@src/features/CongratulationScreen/InfoScreen';

type InputProps = { password: string; cPassword: String };
export const ForgotPasword = ({ route }: any) => {
  const { mobile } = route.params;
  const formOptions: any = { resolver: yupResolver(resetPasswordSchema) };
  const navigation = useNavigation<any>();
  const [isModalVisible, setisModalVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<any>();
  const { handleSubmit, ...formProps } = useForm<InputProps>(formOptions);

  const onSubmit: SubmitHandler<InputProps> = async data => {
    setLoading(true);
    passwordAPI
      .forgot({
        newPassword: data?.cPassword,
        userName: mobile
      })
      .then(res => {
        setLoading(false);
        if (res?.data) {
          setStatus('pass');
          setisModalVisible(prevState => !prevState);
        } else {
          setStatus('fail');
          setisModalVisible(prevState => !prevState);
        }
      });
  };
  const _onRequestClose = () => {
    setisModalVisible(prevState => !prevState);
    navigation.navigate('login');
  };
  return (
    <ScrollContainerLayout topBgColor={colors.secondary}>
      <View style={{ backgroundColor: colors.secondary, height: 150 }} />
      <View>
        <TopShadowView topMar={-85} />
        <CardLayout>
          <LogoContainer
            bgColor={colors.white}
            logo={require('../../../assets/authIcons/verifyotp.png')}
            width={128}
            height={74}
          />
          <TitleLogoView
            title={'Reset Password'}
            desc={
              'Your new password must be different from previous used password.'
            }
          />
          <View>
            <View>
              <ValidationInput
                placeholder="New Password"
                label="New Password"
                fieldName="password"
                autoCapitalize={'none'}
                {...formProps}
              />
              <ValidationInput
                placeholder="Confirm Password"
                label="Confirm Password"
                fieldName="cPassword"
                autoCapitalize={'none'}
                {...formProps}
              />
              <Button
                onPress={handleSubmit(onSubmit)}
                disabled={!!loading}
                title={'Reset Password'}>
                {!!loading && <LoadingIndicator activityColor="white" />}
              </Button>
              <Spacer spacing={10} />
              <View style={styles.backRow}>
                <TextField>Back to </TextField>
                <Pressable
                  style={{ justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => navigation.navigate('login')}>
                  <TextBold style={{ color: colors.primary }}>Login</TextBold>
                </Pressable>
              </View>
            </View>

            <CongratulationsModal
              modalVisible={isModalVisible}
              onRequestClose={_onRequestClose}>
              {status === 'pass' ? (
                <CongratulationScreen
                  onRequestClose={_onRequestClose}
                  heading=""
                  message={`You have successfully reset your Password.`}
                  bottomContent={
                    <View style={{ ...globalStyle.container }}>
                      <Button
                        style={{
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
              ) : (
                <InfoScreen
                  onRequestClose={_onRequestClose}
                  heading=""
                  message={`Sorry, please try again to reset your password.`}
                  bottomContent={
                    <View style={{ ...globalStyle.container }}>
                      <Button
                        style={{
                          backgroundColor: colors.white,
                          borderColor: colors.primary,
                          borderWidth: 1
                        }}
                        textStyle={{ color: colors.primary }}
                        title={'Done'}
                        onPress={_onRequestClose}
                      />
                    </View>
                  }
                />
              )}
            </CongratulationsModal>
          </View>
        </CardLayout>
      </View>
    </ScrollContainerLayout>
  );
};

const styles = StyleSheet.create({
  backRow: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  }
});
