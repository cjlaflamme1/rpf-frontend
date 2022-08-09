import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

const api = axios.create({
  baseURL: 'https://staging.nhclimbingpartners.com',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(async (req) => {
  req.headers = req.headers || {};
  req.headers.Authorization = `Bearer ${await SecureStore.getItemAsync('jwt')}`;
  return req;
})

export default api;
