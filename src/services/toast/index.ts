import { DeviceEventEmitter } from 'react-native';
import { SHOW_TOAST_MESSAGE } from './toastAction';
import { ToastType } from './ToastComponent';

interface optionsProps {
  duration?: number;
  message: string;
  type?: typeof ToastType | any;
}

const toast = {
  info: (options: optionsProps) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: 'info' });
  },
  success: (options: optionsProps) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, {
      ...options,
      type: 'success'
    });
  },
  danger: (options: optionsProps) => {
    DeviceEventEmitter.emit(SHOW_TOAST_MESSAGE, { ...options, type: 'danger' });
  }
};

export default toast;
