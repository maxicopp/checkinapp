import React, {createContext, useContext, useState, useEffect} from 'react';
import {Store} from '../types/types';
import {
  fetchStores as fetchStoresService,
  resetStores as resetStoresService,
  checkin as checkinService,
} from '../services/storeService';

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

  const addFavoriteStore = (storeId: string, storeName: string) => {
    setFavoriteStores(prevFavorites => {
      const isAlreadyFavorite = prevFavorites.some(
        favorite => favorite.storeId === storeId,
      );
      if (isAlreadyFavorite) {
        return prevFavorites.filter(favorite => favorite.storeId !== storeId);
      } else {
        const newFavorite = {storeId, storeName};
        return [...prevFavorites, newFavorite];
      }
    });
  };

  const fetchStores = async () => {
    try {
      const fetchedStores = await fetchStoresService();
      setStores(fetchedStores);
    } catch (error) {
      console.error('Error fetching stores from context:', error);
    }
  };

  const resetStores = async () => {
    try {
      await resetStoresService();
      await fetchStores();
    } catch (error) {
      console.error('Error resetting stores from context:', error);
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
