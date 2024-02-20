import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  centerButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FC5511',
    padding: 10,
    borderRadius: 20,
    zIndex: 4,
  },
  overlayContainer: {
    padding: 20,
    zIndex: 1,
    position: 'absolute',
    width: '100%',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  markerStore: {
    width: 40,
    height: 40,
  },
});

export default styles;
