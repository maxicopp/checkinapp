import React from 'react';
import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import {Store} from '../../types/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

import styles from './StoreTasks.styles';

interface StoreTasksProps {
  store: Store;
  handleCheckin: (storeId: string, taskId: string) => Promise<void>;
}

const StoreTasks: React.FC<StoreTasksProps> = ({store, handleCheckin}) => {
  return (
    <>
      <Text style={[styles.header, styles.darkText]}>
        Tareas de la tienda: {store.name}
      </Text>
      <FlatList
        data={store.tasks}
        renderItem={({item}) => (
          <View style={[styles.taskItem, styles.darkTaskItem]}>
            <Text style={[styles.text, styles.darkText]}>
              {item.description}
            </Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => handleCheckin(store.id, item.id)}>
              <Icon name="check-circle" size={20} color="#FFFFFF" />
              <Text style={styles.buttonText}>Check-in</Text>
            </TouchableOpacity>
          </View>
        )}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
};

export default StoreTasks;
