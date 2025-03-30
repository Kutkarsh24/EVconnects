import axios from 'axios';

// API base URL configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://api.evconnects.com' 
  : 'http://localhost:5000';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for authentication
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Station related API calls
export const stationService = {
  getAllStations: () => api.get('/api/stations'),
  getStationById: (id) => api.get(`/api/stations/${id}`),
  getNearbyStations: (lat, lng, radius = 10) => 
    api.get(`/api/stations/nearby?lat=${lat}&lng=${lng}&radius=${radius}`),
};

// Payment related API calls
export const paymentService = {
  createPaymentIntent: (amount) => api.post('/api/create-payment-intent', { amount }),
  getPaymentHistory: () => api.get('/api/payments/history'),
};

// User related API calls
export const userService = {
  login: (credentials) => api.post('/api/auth/login', credentials),
  register: (userData) => api.post('/api/auth/register', userData),
  getProfile: () => api.get('/api/user/profile'),
  updateProfile: (userData) => api.put('/api/user/profile', userData),
};

export default api;