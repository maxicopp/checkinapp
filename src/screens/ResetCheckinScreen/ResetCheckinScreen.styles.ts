import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  flexContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    paddingHorizontal: 20,
    textAlign: 'center',
    marginBottom: 30,
  },
  centeredContent: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  animatedButton: {
    width: 200,
    height: 200,
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 60,
    fontWeight: 'bold',
  },
});

export default styles;
