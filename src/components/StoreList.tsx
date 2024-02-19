import React from 'react';
import {View, Text, TouchableOpacity, FlatList, StyleSheet} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Store} from '../types/types';

interface StoreListProps {
  stores: Store[];
  onSelectStore: (store: Store) => void;
  isDarkTheme: boolean;
}

const StoreList = ({stores, onSelectStore, isDarkTheme}: StoreListProps) => (
  <FlatList
    horizontal
    data={stores}
    renderItem={({item}) => (
      <View style={[styles.storeItem, isDarkTheme && styles.darkStoreItem]}>
        <Icon
          name="local-mall"
          size={20}
          color={isDarkTheme ? '#E1E1E1' : '#34495E'}
        />
        <Text style={[styles.text, isDarkTheme && styles.darkText]}>
          {item.name}
        </Text>
        <TouchableOpacity
          style={styles.button}
          onPress={() => onSelectStore(item)}>
          <Text style={styles.buttonText}>Ver tareas</Text>
        </TouchableOpacity>
      </View>
    )}
    keyExtractor={item => item.id.toString()}
  />
);

export default StoreList;

const styles = StyleSheet.create({
  storeItem: {
    padding: 20,
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
    marginVertical: 10,
    marginRight: 10,
    shadowColor: '#7F8C8D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  darkStoreItem: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  text: {
    color: '#34495E',
    marginBottom: 10,
  },
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
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
