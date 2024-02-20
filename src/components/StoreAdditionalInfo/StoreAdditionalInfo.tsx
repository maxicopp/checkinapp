import React from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {Schedule, ShippingMethod, Task} from '../../types/types';

import styles from './StoreAdditionalInfo.styles';

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

export default StoreAdditionalInfo;
