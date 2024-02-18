import axios from 'axios';

const API_BASE_URL = 'https://ikp-mobile-challenge-backend.up.railway.app/';

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

export const getStores = async () => {
  try {
    const response = await apiClient.get('stores');
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

export const performCheckin = async (storeId: number, taskId: number) => {
  try {
    const response = await apiClient.post('checkin', {storeId, taskId});
    return response.data;
  } catch (error) {
    console.error('Error performing checkin:', error);
    throw error;
  }
};

export const resetStores = async () => {
  try {
    const response = await apiClient.post('stores/reset');
    return response.data;
  } catch (error) {
    console.error('Error resetting stores:', error);
    throw error;
  }
};
