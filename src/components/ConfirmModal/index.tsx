import React from 'react';
import { Modal } from 'react-native';

interface ConfirmModalProps {
  modalVisible: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
}
const ConfirmModal = ({
  onRequestClose,
  modalVisible,
  children
}: ConfirmModalProps) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={onRequestClose}>
      {children}
    </Modal>
  );
};
export default ConfirmModal;
