import axios from 'axios';
import * as SecureStore from 'expo-secure-store';
import Config from "react-native-config";

const api = axios.create({
  baseURL: Config.API_URL,
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
