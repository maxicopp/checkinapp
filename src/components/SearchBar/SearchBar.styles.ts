import {Dimensions, StyleSheet} from 'react-native';

const {width} = Dimensions.get('window');

const styles = StyleSheet.create({
  searchContainer: {
    width: width - 40,
    borderRadius: 20,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    zIndex: 2,
  },
  searchInput: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 10,
    fontSize: 16,
    borderRadius: 20,
  },
  locationDot: {
    marginRight: 5,
  },
  textInput: {
    flex: 1,
  },
});

export default styles;
