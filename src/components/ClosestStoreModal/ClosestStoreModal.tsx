import React from 'react';
import {Modal, View, Text, Pressable} from 'react-native';
import {Store} from '../../types/types';

import styles from './ClosestStoreModal.styles';

interface ClosestStoreModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  store: Store | null;
}

const ClosestStoreModal: React.FC<ClosestStoreModalProps> = ({
  modalVisible,
  setModalVisible,
  store,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <Pressable
        style={styles.centeredView}
        onPress={() => setModalVisible(false)}>
        <View style={styles.modalView} onStartShouldSetResponder={() => true}>
          <Text style={styles.title}>Closest Store</Text>
          {store ? (
            <>
              <Text style={styles.storeName}>{store.name}</Text>
              <Text style={styles.modalText}>{store.address.direction}</Text>
              <Text style={styles.modalText}>
                Schedule: {store.schedule.from} - {store.schedule.end}
              </Text>
            </>
          ) : (
            <Text style={styles.modalText}>No store found</Text>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

export default ClosestStoreModal;
