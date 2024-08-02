import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../globals/colors';
import { DynamicIcon } from '../../utils/Dynamic/DynamicIcon';
import { useNavigation } from '@react-navigation/native';
import { TextField } from '../../components/TextField/TextField';
import { Fonts, REGULAR_PADDING_SIZE } from '../../globals/themes';
import { Spacer } from '../../components/common/Spacer';
import GreenWorldImageSVG from '../../assets/onBoardingImages/GreenWorldImage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onBoradActions } from '../../redux/actions/combineAction';
import RippleButton from '../../components/Button/RippleButton';
import { useAppDispatch } from '../../redux/store';

export const ThirdScreen = () => {
  const navigation = useNavigation<any>();
  const dispatch = useAppDispatch();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: REGULAR_PADDING_SIZE
      }}>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 6
        }}>
        <GreenWorldImageSVG color={colors.primaryLight} />
        <View
          style={{
            alignItems: 'center'
          }}>
          <Spacer spacing={20} />
          <TextField
            style={{
              fontSize: 32,
              lineHeight: 36,
              fontFamily: Fonts.PoppinsSemiBold
            }}>
            Green World
          </TextField>
          <Spacer spacing={10} />

          <TextField style={{ textAlign: 'center', lineHeight: 30 }}>
            Become a sustainability champion and demonstrate your commitment to
            a traceable and transparent recycling claims.
          </TextField>
        </View>
      </View>
      <View
        style={{
          justifyContent: 'flex-end',
          alignItems: 'center',
          flex: 1,
          marginBottom: 30
        }}>
        <RippleButton
          title={'Get Started'}
          rippleColor={colors.yellow}
          style={{
            width: '100%',
            alignSelf: 'center',
            backgroundColor: colors.primary
          }}
          onPress={async () => {
            await AsyncStorage.setItem('onboard', 'Completed');
            dispatch(onBoradActions.onboard({ onboard: 'Completed' }));
          }}
        />
        <Spacer spacing={20} />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
          }}>
          <Pressable
            onPress={() => navigation.navigate('second')}
            style={{
              borderRadius: 100,
              height: 48,
              width: 48,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: colors.primary
            }}>
            <DynamicIcon
              iconFamily="Ionicons"
              iconName="arrow-back"
              iconSize={24}
              iconColor={colors.primary}
            />
          </Pressable>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
            <View
              style={{
                height: 14,
                width: 14,
                backgroundColor: colors.primaryLight,
                borderRadius: 100
              }}
            />
            <View
              style={{
                height: 14,
                width: 14,
                backgroundColor: colors.primaryLight,
                borderRadius: 100
              }}
            />
            <View
              style={{
                height: 16,
                width: 16,
                backgroundColor: colors.primary,
                borderRadius: 100
              }}
            />
          </View>
          <Pressable
            onPress={() => navigation.navigate('third')}
            style={{
              backgroundColor: colors.white,
              borderRadius: 100,
              height: 48,
              width: 48,
              justifyContent: 'center',
              alignItems: 'center'
            }}>
            <DynamicIcon
              iconFamily="Ionicons"
              iconName="arrow-forward"
              iconSize={24}
              iconColor={colors.white}
            />
          </Pressable>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({});
