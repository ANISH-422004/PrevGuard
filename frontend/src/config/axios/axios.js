import axios from 'axios';
import { VITE_API_URL } from '../../utils/constants';

const token = localStorage.getItem('token');

const axiosInstance = axios.create({
    baseURL: VITE_API_URL,
    headers: {
        'Content-Type': 'application/json',
        Authorization: token ? `Bearer ${token}` : null,
    },
});

axiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token"); // Get latest token
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


export default axiosInstance;