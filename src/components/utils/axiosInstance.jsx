import axios from 'axios';
import { toast } from 'react-toastify';

// Create an Axios instance
const axiosInstance = axios.create({
  baseURL: 'https://api.dxe.whilter.ai/', // Base URL for all API requests
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach tokens or modify requests globally
axiosInstance.interceptors.request.use(
  (config) => {
    // Uncomment the following lines if you want to use token authentication in the future
    /*
    const token = localStorage.getItem('token'); // Assume token is stored in localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    */
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling globally
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const { status } = error.response;
    if (status === 401) {
      // Handle unauthorized errors (e.g., log out the user)
      toast.error('Unauthorized! Please log in again.');
    }
    // You can handle more status codes here
    return Promise.reject(error);
  }
);

export default axiosInstance;
