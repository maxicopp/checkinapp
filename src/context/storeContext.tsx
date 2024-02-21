import React, {createContext, useContext, useState, useEffect} from 'react';
import {Store} from '../types/types';
import {
  fetchStores as fetchStoresService,
  resetStores as resetStoresService,
  checkin as checkinService,
} from '../services/storeService';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface StoreContextType {
  stores: Store[];
  fetchStores: () => Promise<void>;
  resetStores: () => Promise<void>;
  checkin: (storeId: string, taskId: string) => Promise<void>;
  addFavoriteStore: (storeId: string, storeName: string) => void;
  favoriteStores: {storeId: string; storeName: string}[];
}

const StoreContext = createContext<StoreContextType>({
  stores: [],
  fetchStores: async () => {},
  resetStores: async () => {},
  checkin: async () => {},
  addFavoriteStore: () => {},
  favoriteStores: [],
});

export const useStores = () => useContext(StoreContext);

export const StoreProvider = ({children}: {children: React.ReactNode}) => {
  const [stores, setStores] = useState<Store[]>([]);
  const [favoriteStores, setFavoriteStores] = useState<
    {storeId: string; storeName: string}[]
  >([]);

  useEffect(() => {
    const loadFavoriteStores = async () => {
      const storedFavorites = await AsyncStorage.getItem('favoriteStores');
      if (storedFavorites) {
        setFavoriteStores(JSON.parse(storedFavorites));
      }
    };

    loadFavoriteStores();
  }, []);

  const addFavoriteStore = async (storeId: string, storeName: string) => {
    setFavoriteStores(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(
        favorite => favorite.storeId === storeId,
      );
      let updatedFavorites;
      if (isAlreadyFavorite) {
        updatedFavorites = prevFavorites.filter(
          favorite => favorite.storeId !== storeId,
        );
      } else {
        const newFavorite = {storeId, storeName};
        updatedFavorites = [...prevFavorites, newFavorite];
      }
      AsyncStorage.setItem('favoriteStores', JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  };

  const fetchStores = async () => {
    try {
      const fetchedStores = await fetchStoresService();
      setStores(fetchedStores);
    } catch (error) {
      console.error('Error fetching stores from context:', error);
      throw error;
    }
  };

  const resetStores = async () => {
    try {
      await resetStoresService();
      await fetchStores();
    } catch (error) {
      console.error('Error resetting stores from context:', error);
      throw error;
    }
  };

  const checkin = async (storeId: string, taskId: string) => {
    try {
      await checkinService(storeId, taskId);
      await fetchStores();
    } catch (error) {
      console.error('Error during check-in from context:', error);
      throw error;
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        stores,
        fetchStores,
        resetStores,
        checkin,
        addFavoriteStore,
        favoriteStores,
      }}>
      {children}
    </StoreContext.Provider>
  );
};
