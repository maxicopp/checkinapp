import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import StoreTasks from './StoreTasks';

describe('StoreTasks', () => {
  const mockHandleCheckin = jest.fn();
  const mockStore = {
    id: '1',
    name: 'Test Store',
    address: {
      direction: '123 Test St',
      coordinate: {
        lat: '40.7128',
        lng: '-74.0060',
      },
    },
    open: true,
    schedule: {
      from: '09:00',
      end: '17:00',
      timezone: 'GMT+1',
    },
    shipping_methods: [{id: '1', name: 'UPS', description: 'Fast delivery'}],
    tasks: [
      {id: 'task1', description: 'Task 1', assigned: false},
      {id: 'task2', description: 'Task 2', assigned: true},
    ],
  };

  it('renders store name and tasks correctly', () => {
    const {getByText} = render(
      <StoreTasks store={mockStore} handleCheckin={mockHandleCheckin} />,
    );

    expect(getByText('Tareas de la tienda: Test Store')).toBeTruthy();
    expect(getByText('Task 1')).toBeTruthy();
    expect(getByText('Task 2')).toBeTruthy();
  });

  it('calls handleCheckin when a task check-in button is pressed', () => {
    const {getAllByText} = render(
      <StoreTasks store={mockStore} handleCheckin={mockHandleCheckin} />,
    );

    fireEvent.press(getAllByText('Check-in')[0]);
    expect(mockHandleCheckin).toHaveBeenCalledWith('1', 'task1');
  });
});
