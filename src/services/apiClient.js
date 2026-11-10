// src/services/apiClient.js
import axios from 'axios';

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 10000, // Tiempo límite de espera (10 segundos)
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;