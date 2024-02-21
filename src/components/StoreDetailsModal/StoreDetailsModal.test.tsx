import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import StoreDetailsModal from './StoreDetailsModal';

jest.mock('@react-native-async-storage/async-storage', () => ({
  setItem: jest.fn(),
  getItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('StoreDetailsModal', () => {
  it('renders correctly with modalVisible prop', () => {
    const {getByText} = render(
      <StoreDetailsModal
        modalVisible={true}
        setModalVisible={() => {}}
        storeId="1"
        storeName="Test Store"
        storeDirection="123 Test St"
        schedule={{from: '09:00', end: '17:00', timezone: 'GMT+1'}}
        shippingMethods={[]}
        tasks={[]}
      />,
    );

    expect(getByText('Test Store')).toBeTruthy();
    expect(getByText('123 Test St')).toBeTruthy();
  });

  it('toggles expanded info on press', () => {
    const {getByText, queryByText} = render(
      <StoreDetailsModal
        modalVisible={true}
        setModalVisible={() => {}}
        storeId="1"
        storeName="Test Store"
        storeDirection="123 Test St"
        schedule={{from: '09:00', end: '17:00', timezone: 'GMT+1'}}
        shippingMethods={[]}
        tasks={[]}
      />,
    );

    fireEvent.press(getByText('More Info'));
    expect(queryByText('Less Info')).toBeTruthy();

    fireEvent.press(getByText('Less Info'));
    expect(queryByText('More Info')).toBeTruthy();
  });
});
