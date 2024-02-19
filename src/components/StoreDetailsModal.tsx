import React from 'react';
import {Modal, View, Text, Pressable, StyleSheet} from 'react-native';

interface StoreDetailsModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  storeName: string;
  isDarkTheme: boolean;
}

const StoreDetailsModal: React.FC<StoreDetailsModalProps> = ({
  modalVisible,
  setModalVisible,
  storeName,
  isDarkTheme,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, isDarkTheme && styles.darkModalView]}>
          <Text style={[styles.modalText, isDarkTheme && styles.darkText]}>
            {storeName || 'No Store Selected'}
          </Text>
          <Pressable
            style={[styles.button, styles.buttonClose]}
            onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.textStyle}>Cerrar</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  darkText: {
    color: '#E1E1E1',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#00652F',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  darkModalView: {
    backgroundColor: '#333',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default StoreDetailsModal;
