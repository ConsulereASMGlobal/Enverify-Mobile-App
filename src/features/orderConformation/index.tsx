import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Spacer } from '../../components/common/Spacer';
import { FastImage } from '../../components/image';
import { TextField } from '../../components/TextField/TextField';
import { AppLayout } from '../../globals/appLayout';
import { colors } from '../../globals/colors';
import { globalStyle } from '../../globals/globalStyles';
import { routes } from '../../navigation/routes';

export const OrderConformation = ({ navigation }) => {
  return (
    <AppLayout style={globalStyle.centerContainer}>
      {/* <View style={{ flexDirection: 'row-reverse', paddingHorizontal: 20 }}>
        <FastImage
          source={require('../../assets/projectIcon.png')}
          resizeMode="contain"
          style={{ height: 50, width: 50 }}
        />
      </View> */}
      <Spacer spacing={80} />
      <View
        style={[
          globalStyle.FullFlex,
          globalStyle.centerContainer,
          { backgroundColor: '#f2f2f2', borderRadius: 3, padding: 15 }
        ]}>
        <TextField style={{ fontSize: 24, lineHeight: 29, fontWeight: '500' }}>
          Your collection order has been received
        </TextField>
        <Spacer spacing={15} />
        <FastImage
          source={require('../../assets/svgIcon/tickIcon.jpeg')}
          style={{ height: 60, width: 60 }}
        />
        <Spacer spacing={10} />
        <TextField>Your order reference number is</TextField>
        <TextField>{`ASM/2022/08/ABC123`}</TextField>
        <TextField style={{ fontSize: 12 }}>
          The pick up agent information will be shared 24 hours prior to
          collection
        </TextField>

        <TouchableOpacity
          style={{
            backgroundColor: colors.primary,
            borderRadius: 8,
            padding: 8,
            margin: 14
          }}
          onPress={() => navigation.navigate(routes.bottomTabs.order)}>
          <TextField style={{ color: '#fff' }}>My Orders</TextField>
        </TouchableOpacity>
      </View>
    </AppLayout>
  );
};

const styles = StyleSheet.create({});
