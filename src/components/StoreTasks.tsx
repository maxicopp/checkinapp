import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import {Store} from '../types/types';
import Icon from 'react-native-vector-icons/MaterialIcons';

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

const styles = StyleSheet.create({
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkText: {
    color: '#E1E1E1',
  },
  text: {
    color: '#34495E',
    marginBottom: 10,
  },
  taskItem: {
    padding: 20,
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#7F8C8D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  darkTaskItem: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#00652F',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default StoreTasks;
