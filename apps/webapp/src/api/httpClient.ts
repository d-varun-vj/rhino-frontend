import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { getCookie } from '../utils';

// Change from let to const and provide initial values
const httpClient: AxiosInstance = axios.create({});
const httpClientWithoutAccessor: AxiosInstance = axios.create({});

const token: string = getCookie('token') || '';

export const initHttpClient = (baseURL?: string) => {
  // Instead of reassignment, update the instance configurations
  Object.assign(httpClient.defaults, {
    baseURL: baseURL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  Object.assign(httpClientWithoutAccessor.defaults, {
    baseURL: baseURL,
    withCredentials: false,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });

  const requestInterceptor = (config: InternalAxiosRequestConfig<unknown>) => {
    config.headers.Authorization = `Bearer ${token}`;

    return config;
  };

  const responseInterceptor = (response: AxiosResponse<unknown, unknown>) => {
    return response;
  };

  httpClient.interceptors.request.use(requestInterceptor);
  httpClientWithoutAccessor.interceptors.request.use(requestInterceptor);
  httpClient.interceptors.response.use(responseInterceptor);

  return { httpClient, httpClientWithoutAccessor };
};

export { httpClient, httpClientWithoutAccessor };
