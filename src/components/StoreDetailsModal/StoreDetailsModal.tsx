import React, {useState, useEffect} from 'react';
import {Modal, View, Text, Pressable, Image} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import {Task} from '../../types/types';
import StoreAdditionalInfo from '../StoreAdditionalInfo/StoreAdditionalInfo';
import {useStores} from '../../context/storeContext';

import styles from './StoreDetailsModal.styles';

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
      Toast.show({
        type: 'error',
        position: 'top',
        text1: 'Error during check-in',
        text2: 'Please try again.',
        visibilityTime: 4000,
        autoHide: true,
        topOffset: 30,
        bottomOffset: 40,
      });
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
                source={require('../../assets/logo.png')}
                style={styles.logo}
              />
            )}
            {isExpanded && (
              <Image
                source={require('../../assets/banner.jpg')}
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
              {isExpanded ? 'Less' : 'More'} Info
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default StoreDetailsModal;
