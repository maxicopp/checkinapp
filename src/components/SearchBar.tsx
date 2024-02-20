import React from 'react';
import {View, TextInput, StyleSheet, Dimensions, Platform} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

const {width} = Dimensions.get('window');

interface SearchBarProps {
  searchText: string;
  setSearchText: (text: string) => void;
  isDarkTheme: boolean;
}

const SearchBar = ({
  searchText,
  setSearchText,
  isDarkTheme,
}: SearchBarProps) => {
  const searchContainerStyle = {
    ...styles.searchContainer,
    backgroundColor: isDarkTheme
      ? 'rgba(28, 28, 30, 0.4)'
      : 'rgba(255, 255, 255, 0.6)',
  };

  const searchInputStyle = {
    ...styles.searchInput,
    color: isDarkTheme ? '#FFFFFF' : '#000000',
    backgroundColor: isDarkTheme
      ? 'rgba(28, 28, 30, 0.6)'
      : 'rgba(255, 255, 255, 0.6)',
    padding: Platform.OS === 'ios' ? 15 : 0,
  };

  return (
    <View style={searchContainerStyle}>
      <View style={searchInputStyle}>
        <FontAwesome6
          style={styles.locationDot}
          name="location-dot"
          size={20}
          color={isDarkTheme ? '#FFFFFF' : '#000000'}
        />
        <TextInput
          placeholder="Buscar tienda..."
          placeholderTextColor={isDarkTheme ? '#E1E1E1' : '#8e8e93'}
          value={searchText}
          onChangeText={setSearchText}
          style={{flex: 1, color: isDarkTheme ? '#FFFFFF' : '#000000'}}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    width: width - 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 2,
  },
  searchInput: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 20,
  },
  locationDot: {
    marginRight: 5,
  },
});

export default SearchBar;
