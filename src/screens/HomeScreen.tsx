/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  Animated,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
  Modal,
  Pressable,
  Dimensions,
  useColorScheme,
  SafeAreaView,
  Platform,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MapView, {Marker, Polyline, UrlTile} from 'react-native-maps';
import {Store} from '../types/types';
import FooterComponent from '../components/FooterComponent';
import {fetchStores, resetStores, checkin} from '../services/storeService';
import {useLocationPermission} from '../hooks/useLocationPermission';
import markerStore from '../assets/marker-default.png';
import StoreDetailsModal from '../components/StoreDetailsModal';

const {width} = Dimensions.get('window');

const HomeScreen = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [fadeAnim] = useState(new Animated.Value(0));
  const [modalVisible, setModalVisible] = useState(false);
  const [, setCheckinData] = useState({});
  const [searchText, setSearchText] = useState('');
  const [filteredStores, setFilteredStores] = useState<Store[]>([]);
  const userLocation = useLocationPermission();

  const [markerModalVisible, setMarkerModalVisible] = useState(false);
  const [selectedMarker, setSelectedMarker] = useState<Store | null>(null);
  const [closestStore, setClosestStore] = useState<Store | null>(null);

  const scheme = useColorScheme();
  const isDarkTheme = scheme === 'dark';
  const mapRef = useRef<MapView>(null);

  useEffect(() => {
    fetchStores().then(data => {
      setStores(data);
      setFilteredStores(data);
    });
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  useEffect(() => {
    const filtered = stores.filter(store =>
      store.name.toLowerCase().includes(searchText.toLowerCase()),
    );
    setFilteredStores(filtered);
  }, [searchText, stores]);

  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number,
  ): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const findClosestStore = (): Store | null => {
    let storeFound: Store | null = null;
    let minDistance = Number.MAX_VALUE;
    stores.forEach((store: Store) => {
      const distance = calculateDistance(
        userLocation.lat,
        userLocation.lng,
        parseFloat(store.address.coordinate.lat),
        parseFloat(store.address.coordinate.lng),
      );
      if (distance < minDistance) {
        storeFound = store;
        minDistance = distance;
      }
    });
    return storeFound;
  };

  const handleCheckin = async (
    storeId: string,
    taskId: string,
  ): Promise<void> => {
    console.log({storeId, taskId});
    console.log(parseInt(storeId, 10), parseInt(taskId, 10));
    const data = await checkin(storeId, taskId);
    console.log(JSON.stringify(data, null, 2));
    setCheckinData(data);
    setModalVisible(true);
  };

  const handleResetStores = async () => {
    await resetStores();
    const updatedStores = await fetchStores();
    setStores(updatedStores);
  };

  const centerMapOnUserLocation = () => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: userLocation.lat,
          longitude: userLocation.lng,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        },
        1000,
      );
    }
  };

  const onMarkerPress = (store: Store) => {
    setSelectedMarker(store);
    setMarkerModalVisible(true);
  };

  const searchContainerStyle = {
    ...styles.searchContainer,
    backgroundColor: isDarkTheme
      ? 'rgba(28, 28, 30, 0.4)'
      : 'rgba(255, 255, 255, 0.6)',
  };

  const searchInputStyle = {
    ...styles.searchInput,
    color: isDarkTheme ? '#FFFFFF' : '#000000',
    backgroundColor: isDarkTheme
      ? 'rgba(28, 28, 30, 0.4)'
      : 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    paddingVertical: Platform.OS === 'ios' ? 10 : 0,
  };

  return (
    <Animated.View
      style={[
        styles.container,
        isDarkTheme && styles.darkContainer,
        {opacity: fadeAnim},
      ]}>
      <View style={styles.map}>
        <MapView
          ref={mapRef}
          style={styles.map}
          initialRegion={{
            latitude: userLocation.lat,
            longitude: userLocation.lng,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}>
          <UrlTile
            urlTemplate="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png"
            tileSize={256}
            maximumZ={19}
          />
          {userLocation && closestStore && (
            <Polyline
              coordinates={[
                {latitude: userLocation.lat, longitude: userLocation.lng},
                {
                  latitude: parseFloat(closestStore.address.coordinate.lat),
                  longitude: parseFloat(closestStore.address.coordinate.lng),
                },
              ]}
              strokeColor="#00652F"
              strokeWidth={4}
            />
          )}
          {userLocation && (
            <Marker
              tracksViewChanges={false}
              key={userLocation.lat}
              coordinate={{
                latitude: userLocation.lat,
                longitude: userLocation.lng,
              }}
              pinColor="#FC5511"
              onPress={() => {
                const closestStoreFound = findClosestStore();
                console.log({closestStoreFound});
                setClosestStore(closestStoreFound);
              }}
            />
          )}
          {filteredStores.map(store => (
            <Marker
              tracksViewChanges={false}
              key={store.id}
              coordinate={{
                latitude: parseFloat(store.address.coordinate.lat),
                longitude: parseFloat(store.address.coordinate.lng),
              }}
              onPress={() => onMarkerPress(store)}>
              <Image source={markerStore} style={{width: 40, height: 40}} />
            </Marker>
          ))}
        </MapView>
      </View>
      <TouchableOpacity
        style={styles.centerButton}
        onPress={centerMapOnUserLocation}>
        <FontAwesome6 name="location-crosshairs" size={20} color="#FFFFFF" />
      </TouchableOpacity>
      <SafeAreaView style={styles.overlayContainer}>
        <View style={searchContainerStyle}>
          <View style={searchInputStyle}>
            <FontAwesome6
              style={styles.locationDot}
              name="location-dot"
              size={20}
              color={isDarkTheme ? '#FFFFFF' : '#000000'}
            />
            <TextInput
              placeholder="Buscar tienda..."
              placeholderTextColor={isDarkTheme ? '#E1E1E1' : '#8e8e93'}
              value={searchText}
              onChangeText={setSearchText}
              style={{flex: 1, color: isDarkTheme ? '#FFFFFF' : '#000000'}}
            />
          </View>
        </View>

        {selectedStore && (
          <>
            <Text style={[styles.header, isDarkTheme && styles.darkText]}>
              Tareas de la tienda: {selectedStore.name}
            </Text>
            <Text style={[styles.text, isDarkTheme && styles.darkText]}>
              Dirección: {selectedStore.address.direction}
            </Text>
            <Text style={[styles.text, isDarkTheme && styles.darkText]}>
              Horario: {selectedStore.schedule.from} -{' '}
              {selectedStore.schedule.end} ({selectedStore.schedule.timezone})
            </Text>
            <FlatList
              data={selectedStore.tasks}
              renderItem={({item}) => (
                <View
                  style={[styles.taskItem, isDarkTheme && styles.darkTaskItem]}>
                  <Text style={[styles.text, isDarkTheme && styles.darkText]}>
                    {item.description}
                  </Text>
                  <TouchableOpacity
                    style={styles.button}
                    onPress={() => handleCheckin(selectedStore.id, item.id)}>
                    <Icon name="check-circle" size={20} color="#FFFFFF" />
                    <Text style={styles.buttonText}>Check-in</Text>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={item => item.id.toString()}
              ListFooterComponent={
                <FooterComponent
                  onPress={() => setSelectedStore(null)}
                  onReset={handleResetStores}
                />
              }
            />
          </>
        )}
      </SafeAreaView>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={[styles.modalView, isDarkTheme && styles.darkModalView]}>
            <Text style={[styles.modalText, isDarkTheme && styles.darkText]}>
              Check-in realizado con éxito
            </Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}>
              <Text style={styles.textStyle}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
      {selectedMarker && (
        <StoreDetailsModal
          storeDirection={
            selectedMarker ? selectedMarker.address.direction : ''
          }
          modalVisible={markerModalVisible}
          setModalVisible={setMarkerModalVisible}
          storeId={selectedMarker ? selectedMarker.id : ''}
          storeName={selectedMarker ? selectedMarker.name : ''}
          schedule={selectedMarker?.schedule}
          shippingMethods={selectedMarker?.shipping_methods}
          tasks={selectedMarker?.tasks}
        />
      )}
    </Animated.View>
  );
};

export default HomeScreen;

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
  header: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2C3E50',
    marginBottom: 20,
    textAlign: 'center',
  },
  darkText: {
    color: '#E1E1E1',
  },
  text: {
    color: '#34495E',
    marginBottom: 10,
  },
  taskItem: {
    padding: 20,
    backgroundColor: '#ECF0F1',
    borderRadius: 8,
    marginVertical: 10,
    shadowColor: '#7F8C8D',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  darkTaskItem: {
    backgroundColor: '#1E1E1E',
    shadowColor: '#000',
  },
  button: {
    marginTop: 10,
    backgroundColor: '#00652F',
    padding: 12,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  darkModalView: {
    backgroundColor: '#333',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
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
  },
  locationDot: {
    marginRight: 5,
  },
});
