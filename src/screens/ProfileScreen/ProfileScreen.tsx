import React from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  useColorScheme,
} from 'react-native';
import {useStores} from '../../context/storeContext';

import styles from './ProfileScreen.styles';

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
        Do you have a favorite store? Mark it with a heart and make sure it's
        always just a click away!
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
        <Image
          source={require('../../assets/avatar.jpg')}
          style={styles.avatar}
        />
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

export default ProfileScreen;
