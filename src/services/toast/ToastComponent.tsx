import React, { useState, useEffect } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  DeviceEventEmitter,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { colors } from '../../globals/colors';
import { screenWidth } from '../../globals/themes';
import { SHOW_TOAST_MESSAGE } from './toastAction';

const { width, height } = Dimensions.get('window');

export const ToastType = 'info' || 'success' || 'danger';

export const Toast = () => {
  const [modalVisible, setmodalVisible] = useState(false);
  const [messageType, setMessageType] = useState<typeof ToastType>('info');
  const [timeOutDuration, setTimeOutDuration] = useState(1600);
  const [message, setMessage] = useState('');

  const toastColors = {
    info: colors.gray,
    success: colors.primary,
    danger: colors.error
  };
  const closeToast = () => {
    setmodalVisible(false);
  };

  const onNewToast = (data: {
    duration: number;
    message: string;
    type: typeof ToastType | any;
  }) => {
    setmodalVisible(true);
    if (data.duration) {
      setTimeOutDuration(data.duration);
    }
    setMessage(data.message);
    setMessageType(data.type);
    setTimeout(closeToast, timeOutDuration);
  };

  useEffect(() => {
    DeviceEventEmitter.addListener(SHOW_TOAST_MESSAGE, onNewToast);
  }, []);

  return (
    <TouchableOpacity style={styles.centeredView} onPress={closeToast}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeToast}>
        <View style={styles.centeredView}>
          <View
            style={{
              ...styles.modalView,
              backgroundColor: toastColors[messageType]
            }}>
            <Text style={styles.modalText}>{message}</Text>
            <Pressable style={styles.button} onPress={closeToast}>
              <Text style={[styles.modalText, { fontSize: 20 }]}>×</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    top: height - 100
  },
  modalView: {
    justifyContent: 'space-between',
    width: screenWidth - 20,
    flexDirection: 'row',
    padding: 5,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: colors.dark,
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: { color: colors.white, margin: 10 },

  button: {
    borderRadius: 30
  }
});
