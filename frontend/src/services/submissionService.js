import api from './api.js';

export const submitForm = async (submissionData) => {
  const response = await api.post('/submissions', submissionData);
  return response.data;
};

export const getSubmissions = async (formId) => {
  const response = await api.get(`/submissions/${formId}`);
  return response.data;
};
