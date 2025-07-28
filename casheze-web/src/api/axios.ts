import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL, // Reads from .env file
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
