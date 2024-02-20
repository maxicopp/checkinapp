import {Store} from '../types/types';

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

const findClosestStore = (
  stores: Store[],
  userLocation: {lat: number; lng: number},
): Store | null => {
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

export {calculateDistance, findClosestStore};
