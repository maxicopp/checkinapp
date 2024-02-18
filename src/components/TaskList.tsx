import React, {useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import {performCheckin} from '../services/storeService';
import {Task} from '../types/types'; // Assuming you have a Task type defined

type TaskListProps = {
  storeId: string;
  tasks: Task[];
};

const TaskList: React.FC<TaskListProps> = ({storeId, tasks}) => {
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

  const handleCheckin = async (taskId: number) => {
    try {
      await performCheckin(parseInt(storeId), taskId);
      // Handle successful checkin (e.g., show a confirmation message)
    } catch (error) {
      console.error('Error performing checkin:', error);
      // Handle error (e.g., show an error message)
    }
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={tasks}
        keyExtractor={item => item.id.toString()}
        renderItem={({item}) => (
          <View style={styles.taskItem}>
            <Text style={styles.taskTitle}>{item.name}</Text>
            <Text
              style={styles.checkinButton}
              onPress={() => handleCheckin(item.id)}>
              Check-in
            </Text>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  taskItem: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  taskTitle: {
    fontSize: 20,
  },
  checkinButton: {
    marginTop: 10,
    fontSize: 16,
    color: 'blue',
  },
});

export default TaskList;
