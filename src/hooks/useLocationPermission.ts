/* eslint-disable @typescript-eslint/no-unused-vars */
import {useState, useEffect} from 'react';
import {PermissionsAndroid, Platform} from 'react-native';
//import Geolocation from '@react-native-community/geolocation';

export const useLocationPermission = () => {
  const [userLocation, setUserLocation] = useState({
    lat: 36.6825,
    lng: -4.4606,
  });

  useEffect(() => {
    const requestLocationPermission = async () => {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          {
            title: 'Location Permission',
            message: 'This app needs access to your location.',
            buttonNeutral: 'Ask Me Later',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK',
          },
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          // TODO: use real user location, for testing purposes I'm using this one
          /*
          Geolocation.getCurrentPosition(
            position => {
              setUserLocation({
                lat: position.coords.latitude,
                lng: position.coords.longitude,
              });
            },
            error => console.log(error),
            {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000},
          );*/
        } else {
          console.log('Location permission denied');
        }
      }
    };
    requestLocationPermission();
  }, []);

  return userLocation;
};
