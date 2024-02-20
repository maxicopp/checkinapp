import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
} from 'react-native';

const ProfileScreen = () => {
  const favoriteStores = [
    {id: '1', name: 'Tienda de libros'},
    {id: '2', name: 'Electrónica Central'},
    {id: '3', name: 'Moda y Accesorios'},
  ];

  const renderStore = ({item}: {item: {id: string; name: string}}) => (
    <View style={styles.storeItem}>
      <Text style={styles.storeText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.avatarShadow}>
        <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
      </View>
      <Text style={styles.name}>John Doe</Text>
      <Text style={styles.email}>johndoe@example.com</Text>
      <Text style={styles.favoritesTitle}>Tiendas Favoritas</Text>
      <FlatList
        data={favoriteStores}
        renderItem={renderStore}
        keyExtractor={item => item.id}
        style={styles.favoritesList}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  avatarShadow: {
    backgroundColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  name: {
    marginTop: 10,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 18,
    color: '#666',
  },
  favoritesTitle: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  favoritesList: {
    marginTop: 10,
    width: '100%',
  },
  storeItem: {
    backgroundColor: '#e1e1e1',
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
    width: '90%',
    alignSelf: 'center',
  },
  storeText: {
    fontSize: 16,
    color: '#333',
  },
});

export default ProfileScreen;
