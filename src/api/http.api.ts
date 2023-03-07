import axios from 'axios';
import { AxiosError } from 'axios';
import { ApiError } from '@app/api/ApiError';

export const httpApi = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

/* TODO possibly, embed our address in all api calls? or none if user is not signed up (viewer)
httpApi.interceptors.request.use((config) => {
  config.headers = { ...config.headers};

  return config;
});*/

httpApi.interceptors.response.use(undefined, (error: AxiosError) => {
  throw new ApiError<ApiErrorData>(error.response?.data.message || error.message, error.response?.data);
});

export interface ApiErrorData {
  message: string;
}
