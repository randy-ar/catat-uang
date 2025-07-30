// lib/useApi.ts
import axios, { AxiosError } from 'axios';
import { APP_BASE_URL } from '@env';
import { Alert, Platform } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';
import { useSession } from './context'; // Import useSession
import { useMemo } from 'react'; // Import useMemo

const baseURL = `${APP_BASE_URL}/api`;
console.log("DEBUG: Axios Base URL set to: ", baseURL); 

export function useApi() {
  const { signOut } = useSession(); // Get signOut from the hook
  
  const api = useMemo(() => {
    const instance = axios.create({
      baseURL,
      timeout: 10000000,
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      withCredentials: true,
    });

    instance.interceptors.request.use(
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
    );

    instance.interceptors.response.use(
      async (response) => response,
      async (error) => {
        Alert.alert("Error", JSON.stringify(error));
        console.log("APAKAH SAYA TERPANGGIL?")
        const e = error as AxiosError
        console.log('Axios Error:', e.response);
        if(e.response && (e.response?.status === 401 || e.response?.status === 403)){
          signOut(); // Call signOut directly from the useSession hook
          router.navigate('/')
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [signOut]); // Recreate the instance if signOut changes (unlikely, but good practice)

  return api;
}