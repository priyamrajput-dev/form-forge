import api from './api.js';

export const createField = async (fieldData) => {
  const response = await api.post('/fields', fieldData);
  return response.data;
};
