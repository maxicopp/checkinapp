import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';
import {Store} from '../../types/types';

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

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  modalView: {
    width: '80%',
    backgroundColor: '#DEF3DA',
    borderRadius: 25,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 10,
  },
  button: {
    marginTop: 20,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    elevation: 2,
    backgroundColor: '#00652F',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 15,
  },
  modalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 10,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 28,
    color: '#00652F',
    marginBottom: 20,
  },
});

export default ClosestStoreModal;
