import {StyleSheet} from 'react-native';

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

export default styles;
