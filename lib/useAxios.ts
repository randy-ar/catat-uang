import axios from 'axios';
import { APP_BASE_URL } from '@env';
import { Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';

const baseURL = APP_BASE_URL ? `${APP_BASE_URL}/api` : 'https://67582843f2fc.ngrok-free.app/api';
console.log("DEBUG: Axios Base URL set to:", baseURL); 
axios.defaults.withCredentials = true;

const api = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(
  async (config) => {
    let token = ''
    if (Platform.OS === 'web') {
      try {
        token = localStorage.getItem('token') || ''
      } catch (e) {
        console.error('Local storage is unavailable:', e);
      }
    } else {
      token = await SecureStore.getItemAsync('token') || ''
    }
    if(token){
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
)

// Interceptor Respons: Menangani kesalahan global atau refresh token
api.interceptors.response.use(
  async (response) => response,
  async error => {
    if(error.response && (error.response.status === 401 || error.response.status === 403)){
      console.error('Authentication Error:', error.response.data);
      if(Platform.OS === 'web'){
        localStorage.removeItem('token')
        localStorage.removeItem('session')
      }else{
        await SecureStore.deleteItemAsync('token')
        await SecureStore.deleteItemAsync('session')
      }
    }
    return Promise.reject(error);
  }
)

export default api;