import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  const mockSetSearchText = jest.fn();

  it('renders correctly with light theme', () => {
    const {getByPlaceholderText} = render(
      <SearchBar
        searchText=""
        setSearchText={mockSetSearchText}
        isDarkTheme={false}
      />,
    );

    expect(getByPlaceholderText('Search store...')).toBeTruthy();
  });

  it('renders correctly with dark theme', () => {
    const {getByPlaceholderText} = render(
      <SearchBar
        searchText=""
        setSearchText={mockSetSearchText}
        isDarkTheme={true}
      />,
    );

    expect(getByPlaceholderText('Search store...')).toBeTruthy();
  });

  it('calls setSearchText on text change', () => {
    const {getByPlaceholderText} = render(
      <SearchBar
        searchText=""
        setSearchText={mockSetSearchText}
        isDarkTheme={false}
      />,
    );

    fireEvent.changeText(getByPlaceholderText('Search store...'), 'new text');

    expect(mockSetSearchText).toHaveBeenCalledWith('new text');
  });
});
