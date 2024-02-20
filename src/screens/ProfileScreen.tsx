import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Platform,
  useColorScheme,
} from 'react-native';
import {useStores} from '../context/storeContext';

const PlaceholderText = () => {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View
      style={[
        styles.placeholderContainer,
        isDarkMode ? styles.darkPlaceholderContainer : {},
      ]}>
      <Text
        style={[
          styles.placeholderText,
          isDarkMode ? styles.darkPlaceholderText : {},
        ]}>
        ¿Tienes unas tienda favorita? ¡Marcala con un corazón y asegúrate de que
        siempre esté a solo un toque de distancia!
      </Text>
    </View>
  );
};

const ProfileScreen = () => {
  const {favoriteStores} = useStores();
  const isDarkMode = useColorScheme() === 'dark';

  const renderStore = ({
    item,
  }: {
    item: {storeId: string; storeName: string};
  }) => (
    <View style={[styles.storeItem, isDarkMode ? styles.darkStoreItem : {}]}>
      <Text style={[styles.storeText, isDarkMode ? styles.darkStoreText : {}]}>
        {item.storeName}
      </Text>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, isDarkMode ? styles.darkContainer : {}]}>
      <View style={styles.avatarShadow}>
        <Image source={require('../assets/avatar.jpg')} style={styles.avatar} />
      </View>
      <Text style={[styles.name, isDarkMode ? styles.darkName : {}]}>
        John Doe
      </Text>
      <Text style={[styles.email, isDarkMode ? styles.darkEmail : {}]}>
        johndoe@example.com
      </Text>
      {favoriteStores.length > 0 && (
        <Text
          style={[
            styles.favoritesTitle,
            isDarkMode ? styles.darkFavoritesTitle : {},
          ]}>
          Favorites Stores
        </Text>
      )}
      <FlatList
        data={favoriteStores}
        renderItem={renderStore}
        keyExtractor={item => item.storeId}
        style={styles.favoritesList}
        ListEmptyComponent={PlaceholderText}
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
    //marginVertical: 50,
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
    marginTop: Platform.OS === 'ios' ? 15 : 10,
    marginBottom: 5,
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
  placeholderContainer: {
    alignItems: 'center',

    padding: 20,
    margin: 20,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    fontStyle: 'italic',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  darkPlaceholderContainer: {
    backgroundColor: '#424242',
  },
  darkPlaceholderText: {
    color: '#ccc',
  },
  darkStoreItem: {
    backgroundColor: '#424242',
  },
  darkStoreText: {
    color: '#fff',
  },
  darkName: {
    color: '#fff',
  },
  darkEmail: {
    color: '#ccc',
  },
  darkFavoritesTitle: {
    color: '#fff',
  },
});

export default ProfileScreen;
