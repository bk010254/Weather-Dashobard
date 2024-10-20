import axios from 'axios';

const BASE_URL = 'http://localhost:3001/favorites';


export const getFavorites = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

export const addFavorite = async (city) => {
  const response = await axios.post(BASE_URL, { city });
  return response.data;
};

export const removeFavorite = async (id) => {
  await axios.delete(`${BASE_URL}/${id}`);
};