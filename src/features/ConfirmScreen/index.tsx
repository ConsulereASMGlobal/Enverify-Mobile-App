import React from 'react';
import { StyleSheet, View } from 'react-native';
import { colors } from '../../globals/colors';
import {
  Fonts,
  REGULAR_PADDING_SIZE,
  HALF_MEDIUM_PADDING_SIZE,
  XLARGE_PADDING_SIZE
} from '../../globals/themes';
import { TextField } from '../../components/TextField/TextField';
import Button from '../../components/Button/Button';
import { LoadingIndicator } from '../../components/LoadingIndicator';

interface ConfirmScreenProps {
  onYes: () => void;
  onNo: () => void;
  heading?: string;
  message?: string;
  bottomContent?: React.ReactNode;
  fillColor?: string;
  loading?: boolean;
}

export default function ConfirmScreen({
  message = '',
  onYes,
  onNo,
  loading
}: ConfirmScreenProps) {
  return (
    <View style={styles.modalContainer}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TextField style={[styles.modalText, { color: colors.dark }]}>
            {message}
          </TextField>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 10
            }}>
            <View style={{ width: '48%' }}>
              <Button
                style={{
                  width: '100%',
                  borderRadius: 100,
                  backgroundColor: colors.white,
                  borderWidth: 1,
                  borderColor: colors.secondary
                }}
                textStyle={{
                  color: colors.secondary
                }}
                title={'No'}
                onPress={onNo}
              />
            </View>
            <View style={{ width: '48%' }}>
              <Button
                style={{
                  width: '100%',
                  borderRadius: 100
                }}
                textStyle={{
                  color: colors.white
                }}
                title={'Yes'}
                onPress={onYes}>
                {loading && <LoadingIndicator activityColor="white" />}
              </Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)' // Adjust the opacity here (0.5 means 50% transparency)
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  alignCenter: {
    alignSelf: 'center'
  },
  modalView: {
    marginHorizontal: REGULAR_PADDING_SIZE,
    backgroundColor: 'white',
    borderRadius: 16,
    paddingVertical: 20,
    paddingHorizontal: 34,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    paddingBottom: XLARGE_PADDING_SIZE,
    minWidth: '80%'
  },
  hitSlop: {
    top: 10,
    bottom: 15,
    right: 30
  },
  button: {
    alignItems: 'flex-end',
    paddingBottom: REGULAR_PADDING_SIZE
  },
  messageStyle: {
    textAlign: 'center',
    lineHeight: 22,
    paddingTop: HALF_MEDIUM_PADDING_SIZE,
    fontFamily: Fonts.PoppinsRegular
  },
  modalText: {
    fontSize: 20,
    lineHeight: 26,
    textAlign: 'center',
    color: colors.primary,
    paddingTop: REGULAR_PADDING_SIZE,
    fontWeight: 'bold'
  }
});
