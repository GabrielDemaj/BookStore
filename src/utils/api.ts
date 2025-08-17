import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { MMKV } from 'react-native-mmkv';
import { StateStorage } from 'zustand/middleware';

// create an axios instance
const api: AxiosInstance = axios.create({
  // baseURL: 'http://localhost:3000/',
  baseURL: 'http://10.0.2.2:3000',
});

export const persistStorage = new MMKV({ id: 'api' });

export const storage: StateStorage = {
  setItem: (name, value) => {
    return persistStorage.set(name, value);
  },
  getItem: name => {
    const value = persistStorage.getString(name);
    return value ?? null;
  },
  removeItem: name => {
    return persistStorage.delete(name);
  },
};
// request interceptor
api.interceptors.request.use(
  async (config: any) => {
    if (config.headers === undefined) {
      config.headers = {};
    }
    const accessToken = await storage.getItem('accessToken');

    if (accessToken) {
      config.headers['Authorization'] = 'Bearer ' + accessToken;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

// response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    if (response.status > 199 && response.status < 400) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    return Promise.reject(error);
  },
);

export default api;
