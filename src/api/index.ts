import axios from 'axios';
import { headers } from '@/config';

export const client = axios.create({
  headers,
});

client.interceptors.request.use(
  (config) => {
    // 放 token 的地方
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

client.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // 判斷 401 導回登入
    return Promise.reject(error);
  },
);
