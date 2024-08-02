import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../globals/colors';
import { DynamicIcon } from '../../utils/Dynamic/DynamicIcon';
import { useNavigation } from '@react-navigation/native';
import { TextField } from '../../components/TextField/TextField';
import { Fonts, REGULAR_PADDING_SIZE } from '../../globals/themes';
import { Spacer } from '../../components/common/Spacer';
import ReturnImageSVG from '../../assets/onBoardingImages/ReturnImage';

export const SecondScreen = () => {
  const navigation = useNavigation<any>();
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
        <ReturnImageSVG color={colors.primaryLight} />
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
            Supply to Recycler
          </TextField>
          <Spacer spacing={10} />

          <TextField style={{ textAlign: 'center', lineHeight: 30 }}>
            {`Supply the sorted recyclables to a recycler which completes the loop, ensuring  responsible and sustainable circular economy`}
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
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: '100%',
            justifyContent: 'space-between'
          }}>
          <Pressable
            onPress={() => navigation.navigate('first')}
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
                height: 16,
                width: 16,
                backgroundColor: colors.primary,
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
          </View>
          <Pressable
            onPress={() => navigation.navigate('third')}
            style={{
              backgroundColor: colors.primary,
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
