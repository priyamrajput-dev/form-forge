import api from './api.js';

export const createForm = async (formData) => {
  const response = await api.post('/forms', formData);
  return response.data;
};

export const getMyForms = async () => {
  const response = await api.get('/forms/my-forms');
  return response.data;
};

export const getFormWithFields = async (formId) => {
  const response = await api.get(`/forms/${formId}`);
  return response.data;
};
