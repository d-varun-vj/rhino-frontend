import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { getCookie } from '../utils';

// Change from let to const and provide initial values
const httpClient: AxiosInstance = axios.create({
  withCredentials: false, // Prevent sending cookies
});
const httpClientWithoutAccessor: AxiosInstance = axios.create({
  withCredentials: false, // Prevent sending cookies
});

// Read token from cookie once during initialization
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
    // Ensure cookies are not sent with each request
    config.withCredentials = false;
    // Ensure token is in Authorization header
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
