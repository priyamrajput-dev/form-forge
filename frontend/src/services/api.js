import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true, // Important for sending/receiving cookies (JWT)
});

// Request interceptor to add authorization header if needed
// Or handle common errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data?.message || error.message);
  }
);

export default api;
