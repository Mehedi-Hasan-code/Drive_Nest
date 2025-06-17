import axios from 'axios';
import { auth } from '../service/firebase.config.js';

export const privateApi = axios.create({
  baseURL: `${import.meta.env.VITE_API_BASE_URL}`,
  withCredentials: true,
});

privateApi.interceptors.request.use(
  async (config) => {
    const user = auth.currentUser;
    if (user) {
      const fbToken = await user.getIdToken();
      config.headers.Authorization = `Bearer ${fbToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

privateApi.interceptors.response.use(
  (res) => {
    // console.log(res.data);
    return res.data
  }, 
  (err) => {
    console.log(err);
  }
)
