import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Schedule, ShippingMethod, Task} from '../types/types';

interface StoreAdditionalInfoProps {
  schedule: Schedule;
  shippingMethods: ShippingMethod[];
  tasks: Task[];
}

const StoreAdditionalInfo: React.FC<StoreAdditionalInfoProps> = ({
  schedule,
  shippingMethods,
  tasks,
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
          <Text key={id} style={styles.sectionContent}>
            {description} - {assigned ? 'Assigned' : 'Not Assigned'}
          </Text>
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
});

export default StoreAdditionalInfo;
