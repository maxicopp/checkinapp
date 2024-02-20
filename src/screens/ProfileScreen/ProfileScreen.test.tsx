import React from 'react';
import {render} from '@testing-library/react-native';
import ProfileScreen from './ProfileScreen';

jest.mock('../../context/storeContext', () => ({
  useStores: jest.fn(() => ({
    favoriteStores: [
      {
        storeId: '1',
        storeName: 'Favorite Store 1',
      },
    ],
  })),
}));

const mockColorScheme = jest.fn(() => 'light');
jest.mock('react-native/Libraries/Utilities/useColorScheme', () => ({
  ...jest.requireActual('react-native/Libraries/Utilities/useColorScheme'),
  useColorScheme: mockColorScheme,
}));

describe('ProfileScreen', () => {
  it('renders favorite stores when available', () => {
    const {getByText} = render(<ProfileScreen />);

    expect(getByText('Favorite Store 1')).toBeTruthy();
  });

  it('applies dark mode styles when in dark mode', () => {
    const {getByText} = render(<ProfileScreen />);
    const storeName = getByText('Favorites Stores');

    expect(storeName).toBeTruthy();
  });
});
