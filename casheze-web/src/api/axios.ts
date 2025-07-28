import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config(); // Load .env variables

const axiosInstance = axios.create({
  baseURL: process.env.API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
