import axios from 'axios';

const API_URL = 'https://ikp-mobile-challenge-backend.up.railway.app/';

export const fetchStores = async () => {
  try {
    const response = await axios.get(`${API_URL}stores`);
    return response.data;
  } catch (error) {
    console.error('Error fetching stores:', error);
    throw error;
  }
};

export const resetStores = async () => {
  try {
    await axios.post(`${API_URL}stores/reset`);
  } catch (error) {
    console.error('Error resetting stores:', error);
    throw error;
  }
};

export const checkin = async (storeId: string, taskId: string) => {
  console.log({storeId, taskId});
  try {
    const response = await axios.post(`${API_URL}checkin`, {
      storeId,
      taskId,
    });
    return response.data;
  } catch (error) {
    console.error('Error during check-in:', error);
    throw error;
  }
};
