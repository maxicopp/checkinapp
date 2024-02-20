import React from 'react';
import {render, fireEvent} from '@testing-library/react-native';
import StoreAdditionalInfo from './StoreAdditionalInfo';

describe('StoreAdditionalInfo', () => {
  const mockOnCheckin = jest.fn();
  const mockSchedule = {
    from: '09:00',
    end: '17:00',
    timezone: 'GMT+1',
  };
  const mockShippingMethods = [
    {id: '1', name: 'UPS', description: 'Fast delivery'},
    {id: '2', name: 'FedEx', description: 'Secure delivery'},
  ];
  const mockTasks = [
    {id: '1', description: 'Inventory Check', assigned: false},
    {id: '2', description: 'Restock Shelves', assigned: true},
  ];

  it('renders schedule, shipping methods, and tasks correctly', () => {
    const {getByText} = render(
      <StoreAdditionalInfo
        schedule={mockSchedule}
        shippingMethods={mockShippingMethods}
        tasks={mockTasks}
        onCheckin={mockOnCheckin}
      />,
    );

    // Verify schedule
    expect(getByText('09:00 - 17:00 (GMT+1)')).toBeTruthy();

    // Verify shipping methods
    expect(getByText('UPS: Fast delivery')).toBeTruthy();
    expect(getByText('FedEx: Secure delivery')).toBeTruthy();

    // Verify tasks
    expect(getByText('Inventory Check - Not Assigned')).toBeTruthy();
    expect(getByText('Restock Shelves - Assigned')).toBeTruthy();
  });

  it('calls onCheckin when the check-in button is pressed for a not assigned task', () => {
    const {getAllByText} = render(
      <StoreAdditionalInfo
        schedule={mockSchedule}
        shippingMethods={mockShippingMethods}
        tasks={mockTasks}
        onCheckin={mockOnCheckin}
      />,
    );

    const checkInButtons = getAllByText('Check-in');
    fireEvent.press(checkInButtons[0]);
    expect(mockOnCheckin).toHaveBeenCalledWith('1');
  });

  it('does not call onCheckin when the check-in button is pressed for an assigned task', () => {
    mockOnCheckin.mockClear();

    const {getAllByText} = render(
      <StoreAdditionalInfo
        schedule={mockSchedule}
        shippingMethods={mockShippingMethods}
        tasks={mockTasks}
        onCheckin={mockOnCheckin}
      />,
    );

    const checkInButtons = getAllByText('Check-in');
    expect(checkInButtons.length).toBe(2);

    fireEvent.press(checkInButtons[1]);
    expect(mockOnCheckin).not.toHaveBeenCalled();
  });
});
