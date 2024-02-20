import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Schedule, ShippingMethod, Task} from '../types/types';

interface StoreAdditionalInfoProps {
  schedule: Schedule;
  shippingMethods: ShippingMethod[];
  tasks: Task[];
  onCheckin: (taskId: string) => void;
}

const StoreAdditionalInfo: React.FC<StoreAdditionalInfoProps> = ({
  schedule,
  shippingMethods,
  tasks,
  onCheckin,
}) => {
  return (
    <View style={styles.additionalInfoContainer}>
      <Text style={styles.sectionTitle}>Additional Store Information</Text>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionSubtitle}>Schedule:</Text>
        <Text style={styles.sectionContent}>
          {schedule.from} - {schedule.end} ({schedule.timezone})
        </Text>
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionSubtitle}>Shipping Methods:</Text>
        {shippingMethods.map(({id, name, description}) => (
          <Text key={id} style={styles.sectionContent}>
            {name}: {description}
          </Text>
        ))}
      </View>
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionSubtitle}>Tasks:</Text>
        {tasks.map(({id, description, assigned}) => (
          <View key={id} style={styles.taskContainer}>
            <Text style={styles.sectionContent}>
              {description} - {assigned ? 'Assigned' : 'Not Assigned'}
            </Text>
            <TouchableOpacity
              style={[styles.checkinButton, assigned && styles.disabledButton]}
              onPress={() => onCheckin(id)}
              disabled={assigned}>
              <Text style={styles.checkinButtonText}>Check-in</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  additionalInfoContainer: {
    marginTop: 20,
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#333',
    marginBottom: 10,
  },
  sectionContainer: {
    marginBottom: 15,
  },
  sectionSubtitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#555',
  },
  sectionContent: {
    fontSize: 14,
    color: '#666',
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkinButton: {
    backgroundColor: '#007BFF',
    padding: 5,
    borderRadius: 4,
    marginLeft: 10,
  },
  checkinButtonText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  disabledButton: {
    backgroundColor: '#28a745',
  },
});

export default StoreAdditionalInfo;
