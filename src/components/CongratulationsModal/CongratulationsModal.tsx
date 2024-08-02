import React from 'react';
import { Modal } from 'react-native';

interface CongratulationModalProps {
  modalVisible: boolean;
  children: React.ReactNode;
  onRequestClose: () => void;
}
const CongratulationsModal = ({
  onRequestClose,
  modalVisible,
  children
}: CongratulationModalProps) => {
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
export default CongratulationsModal;
