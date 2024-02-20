import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  logo: {
    width: 100,
    height: 100,
    borderRadius: 50,
    position: 'absolute',
    top: -70,
    left: '-50%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 30,
  },
  banner: {
    width: '100%',
    height: 150,
    flex: 1,
    borderRadius: 5,
    margin: -35,
  },
  favoriteIcon: {
    position: 'absolute',
    top: 0,
    right: '-50%',
  },
  storeName: {
    fontWeight: 'bold',
    fontSize: 20,
    marginVertical: 15,
    color: 'black',
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#007BFF',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
    elevation: 2,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
    paddingTop: 50,
  },
  modalView: {
    margin: 20,
    backgroundColor: '#DEF3DA',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
    position: 'relative',
  },
  buttonClose: {
    backgroundColor: '#28a745',
  },
  textStyle: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'left',
    fontSize: 16,
    color: 'black',
    alignSelf: 'flex-start',
    overflow: 'scroll',
  },
});

export default styles;
