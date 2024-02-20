import React from 'react';
import {View, TextInput, Platform} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';

import styles from './SearchBar.styles';

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
    padding: Platform.OS === 'ios' ? 10 : 0,
  };

  const textInputStyle = {
    ...styles.textInput,
    color: isDarkTheme ? '#FFFFFF' : '#000000',
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
          placeholder="Search store..."
          placeholderTextColor={isDarkTheme ? '#E1E1E1' : '#8e8e93'}
          value={searchText}
          onChangeText={setSearchText}
          style={textInputStyle}
        />
      </View>
    </View>
  );
};

export default SearchBar;
