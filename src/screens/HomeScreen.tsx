/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  SafeAreaView,
  Image,
} from 'react-native';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import MapView, {Marker, Polyline, UrlTile} from 'react-native-maps';
import {Store} from '../types/types';
import {useLocationPermission} from '../hooks/useLocationPermission';
import markerStore from '../assets/marker-default.png';
import StoreDetailsModal from '../components/StoreDetailsModal';
import {useStores} from '../context/storeContext';
import {findClosestStore} from '../utils/mapUtils';
import SearchBar from '../components/SearchBar';
import StoreTasks from '../components/StoreTasks';

const HomeScreen = () => {
  const {stores, checkin} = useStores();
  const selectedStore: Store | null = null;
  const [fadeAnim] = useState(new Animated.Value(0));
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

  const handleCheckin = async (
    storeId: string,
    taskId: string,
  ): Promise<void> => {
    await checkin(storeId, taskId);
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
                const closestStoreFound = findClosestStore(
                  stores,
                  userLocation,
                );
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
        <SearchBar
          searchText={searchText}
          setSearchText={setSearchText}
          isDarkTheme={isDarkTheme}
        />

        {selectedStore && (
          <StoreTasks handleCheckin={handleCheckin} store={selectedStore} />
        )}
      </SafeAreaView>
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
});
