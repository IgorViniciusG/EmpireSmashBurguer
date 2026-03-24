import { API_URL } from './api';

export const getBurguers = async () => {
  const burgersResponse = await fetch(`${API_URL}/burguers`);
  const burguersData = await burgersResponse.json();
  return burguersData;
};

export const getCombos = async () => {
  const combosResponse = await fetch(`${API_URL}/combos`);
  const combosData = await combosResponse.json();
  return combosData;
};

export const getSides = async () => {
  const sidesResponse = await fetch(`${API_URL}/sides`);
  const sidesData = await sidesResponse.json();
  return sidesData;
};
