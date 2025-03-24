/* eslint-disable */
import axios, {
  AxiosAdapter,
  AxiosHeaderValue,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

import { getCookie } from '../utils';

// Create a custom adapter using fetch
const fetchAdapter: AxiosAdapter = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  const url = config.baseURL ? `${config.baseURL}${config.url}` : config.url;

  // Convert headers to AxiosHeaders if they aren't already
  const headers = new AxiosHeaders();
  if (config.headers) {
    // Type-safe header entries
    const headerEntries = Object.entries(config.headers) as Array<
      [string, AxiosHeaderValue]
    >;
    headerEntries.forEach(([key, value]) => {
      if (value !== undefined) {
        headers.set(key, value);
      }
    });
  }

  const fetchOptions: RequestInit = {
    method: config.method?.toUpperCase() || 'GET',
    headers: Object.fromEntries(headers.entries()) as HeadersInit,
    credentials: 'omit',
  };

  if (config.data) {
    fetchOptions.body = JSON.stringify(config.data);
  }

  const response = await fetch(url!, fetchOptions);
  let responseData: unknown;

  try {
    responseData = await response.json();
  } catch (_error: unknown) {
    // Use underscore to indicate intentionally unused parameter
    responseData = null;
  }

  const axiosResponse: AxiosResponse<unknown> = {
    data: responseData,
    status: response.status,
    statusText: response.statusText,
    headers: Object.fromEntries(response.headers.entries()),
    config: {
      ...config,
      headers,
    } as InternalAxiosRequestConfig,
    request: null,
  };

  return axiosResponse;
};

const httpClient: AxiosInstance = axios.create({
  adapter: fetchAdapter,
});
const httpClientWithoutAccessor: AxiosInstance = axios.create({
  adapter: fetchAdapter,
});

// Read token from cookie once during initialization
const token: string = getCookie('token') || '';

export const initHttpClient = (baseURL?: string) => {
  const defaultHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  Object.assign(httpClient.defaults, {
    baseURL: baseURL,
    withCredentials: false,
    headers: defaultHeaders,
  });

  Object.assign(httpClientWithoutAccessor.defaults, {
    baseURL: baseURL,
    withCredentials: false,
    headers: defaultHeaders,
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
