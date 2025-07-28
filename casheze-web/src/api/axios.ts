import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace with live URL if hosted
  headers: {
    'Content-Type': 'application/json',
  },
});

export default axiosInstance;
