import axios from 'axios';

export const publicApi = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

publicApi.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    console.log(err);
  }
);
