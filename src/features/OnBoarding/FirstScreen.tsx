import { Pressable, StatusBar, StyleSheet, View } from 'react-native';
import React from 'react';
import { colors } from '../../globals/colors';
import { DynamicIcon } from '../../utils/Dynamic/DynamicIcon';
import { useNavigation } from '@react-navigation/native';
import { TextField } from '../../components/TextField/TextField';
import { Fonts, REGULAR_PADDING_SIZE } from '../../globals/themes';
import { Spacer } from '../../components/common/Spacer';
import CollectImageSVG from '../../assets/onBoardingImages/CollectImage';

export const FirstScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: colors.backgroundColor,
        paddingHorizontal: REGULAR_PADDING_SIZE
      }}>
      <StatusBar backgroundColor={colors.secondary} />
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          flex: 6
        }}>
        <CollectImageSVG color={colors.primaryLight} />
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
            Collect
          </TextField>
          <Spacer spacing={10} />

          <TextField style={{ textAlign: 'center', lineHeight: 22 }}>
            Every piece you gather helps create a healthier planet for all
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
          <View
            style={{
              borderRadius: 100,
              height: 48,
              width: 48,
              justifyContent: 'center',
              alignItems: 'center',
              borderWidth: 2,
              borderColor: colors.white
            }}>
            <DynamicIcon
              iconFamily="Ionicons"
              iconName="arrow-back"
              iconSize={24}
              iconColor={colors.white}
            />
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10
            }}>
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
            onPress={() => navigation.navigate('second')}
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
