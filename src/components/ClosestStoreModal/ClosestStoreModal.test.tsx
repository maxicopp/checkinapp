import React from 'react';
import {render} from '@testing-library/react-native';
import ClosestStoreModal from './ClosestStoreModal';

describe('ClosestStoreModal', () => {
  const mockSetModalVisible = jest.fn();

  it('renders correctly with a store', () => {
    const store = {
      id: '1',
      name: 'Test Store',
      address: {direction: '123 Test St', coordinate: {lat: '0', lng: '0'}},
      tasks: [],
      open: true,
      schedule: {from: '09:00', end: '21:00', timezone: 'UTC'},
      shipping_methods: [],
    };

    const {getByText} = render(
      <ClosestStoreModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        store={store}
      />,
    );

    expect(getByText('Closest Store')).toBeTruthy();
    expect(getByText('Test Store')).toBeTruthy();
    expect(getByText('123 Test St')).toBeTruthy();
    expect(getByText('Schedule: 09:00 - 21:00')).toBeTruthy();
  });

  it('renders correctly without a store', () => {
    const {getByText} = render(
      <ClosestStoreModal
        modalVisible={true}
        setModalVisible={mockSetModalVisible}
        store={null}
      />,
    );

    expect(getByText('No store found')).toBeTruthy();
  });
});
