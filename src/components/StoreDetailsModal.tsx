import React, {useState, useEffect} from 'react';
import {Modal, View, Text, Pressable, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Task} from '../types/types';
import StoreAdditionalInfo from './StoreAdditionalInfo';
import {useStores} from '../context/storeContext';

interface StoreDetailsModalProps {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
  storeId: string;
  storeName: string;
  storeDirection: string;
  schedule: {from: string; end: string; timezone: string};
  shippingMethods: {id: string; name: string; description: string}[];
  tasks: Task[];
}

const StoreDetailsModal: React.FC<StoreDetailsModalProps> = ({
  modalVisible,
  setModalVisible,
  storeId,
  storeName,
  storeDirection,
  schedule,
  shippingMethods,
  tasks: initialTasks,
}) => {
  const {checkin, addFavoriteStore, favoriteStores} = useStores();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  useEffect(() => {
    setTasks(initialTasks);
    const isFav = favoriteStores.some(favorite => favorite.storeId === storeId);
    setIsFavorite(isFav);
  }, [initialTasks, favoriteStores, storeId]);

  const handleCheckin = async (taskId: string) => {
    try {
      await checkin(storeId, taskId);
      setTasks(
        tasks.map(task => {
          if (task.id === taskId) {
            return {...task, assigned: true};
          }
          return task;
        }),
      );
    } catch (error) {
      console.error('Error during check-in:', error);
    }
  };

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
          <View style={styles.header}>
            {!isExpanded && (
              <Image
                source={require('../assets/logo.png')}
                style={styles.logo}
              />
            )}
            {isExpanded && (
              <Image
                source={require('../assets/banner.jpg')}
                style={styles.banner}
              />
            )}
            <Icon
              name={isFavorite ? 'heart' : 'heart-o'}
              size={24}
              color="red"
              onPress={() => addFavoriteStore(storeId, storeName)}
              style={styles.favoriteIcon}
            />
          </View>
          <Text style={styles.storeName}>
            {storeName || 'No Store Selected'}
          </Text>
          <Text style={styles.modalText}>
            {storeDirection || 'No Direction Provided'}
          </Text>
          {isExpanded && (
            <StoreAdditionalInfo
              schedule={schedule}
              shippingMethods={shippingMethods}
              tasks={tasks}
              onCheckin={handleCheckin}
            />
          )}
          <Pressable
            onPress={() => setIsExpanded(!isExpanded)}
            style={[styles.button, styles.buttonClose]}>
            <Text style={styles.textStyle}>
              {isExpanded ? 'Menos' : 'Más'} Info
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: -70,
    left: '-50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  banner: {
    width: '100%',
    height: 150,
    flex: 1,
    borderRadius: 5,
    margin: -35,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: '-50%',
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 15,
    color: 'black',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#DEF3DA',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    position: 'relative',
  },
  buttonClose: {
    backgroundColor: '#28a745',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 16,
    color: 'black',
    alignSelf: 'flex-start',
    overflow: 'scroll',
  },
});

export default StoreDetailsModal;
