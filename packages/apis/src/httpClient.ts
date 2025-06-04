/* eslint-disable */
import axios, {
  AxiosAdapter,
  AxiosHeaderValue,
  AxiosHeaders,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
  RawAxiosRequestHeaders,
} from 'axios';

import { VITE_WICKET_BASE_URL } from './endpoints';
import { getCookie } from '@rhino/utils';

// Create a custom adapter using fetch
const fetchAdapter: AxiosAdapter = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  // Build URL with query parameters
  let finalUrl = config.baseURL
    ? `${config.baseURL}${config.url}`
    : config.url || '';

  // Handle query parameters
  if (config.params) {
    const queryParams = new URLSearchParams();
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        queryParams.append(key, String(value));
      }
    });

    const queryString = queryParams.toString();
    if (queryString) {
      finalUrl += (finalUrl.includes('?') ? '&' : '?') + queryString;
    }
  }

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
    headers: headers.toJSON() as HeadersInit,
    credentials: 'omit',
  };

  if (config.data) {
    fetchOptions.body = config.data;
  }

  const response = await fetch(finalUrl, fetchOptions);

  if (response.status === 401 || response.status === 500) {
    document.cookie = 'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
    window.location.href = VITE_WICKET_BASE_URL + 'dashboard?-2.-logout';
  }

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
    headers: response.headers as unknown as RawAxiosRequestHeaders,
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
const httpClientWithoutAuthorization: AxiosInstance = axios.create({
  adapter: fetchAdapter,
});

// Read token from cookie once during initialization
const token: string = getCookie() || '';

export const initHttpClient = async (baseURL?: string) => {
  const defaultHeaders = new AxiosHeaders({
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  });

  Object.assign(httpClient.defaults, {
    baseURL: baseURL,
    withCredentials: false,
    headers: defaultHeaders,
  });

  Object.assign(httpClientWithoutAuthorization.defaults, {
    baseURL: baseURL,
    withCredentials: false,
    headers: defaultHeaders,
  });

  const requestInterceptor = (config: InternalAxiosRequestConfig<unknown>) => {
    // Ensure cookies are not sent with each request
    config.withCredentials = false;

    // Check if token exists
    if (!token) {
      // Redirect to login if token is missing
      window.location.href = VITE_WICKET_BASE_URL + 'login';
    }

    // Ensure token is in Authorization header
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  };

  const responseInterceptor = (response: AxiosResponse<unknown, unknown>) => {
    return response;
  };

  const errorInterceptor = (error: any) => {
    console.log('Error: ', error);

    if (error.response) {
      const { status } = error.response || {};
      if (status === 401 || status === 500) {
        window.location.href = VITE_WICKET_BASE_URL + 'login';
      }
    } else {
      console.error('Unexpected Error:', error.message);
      window.location.href = VITE_WICKET_BASE_URL + 'login';
    }
    return Promise.reject(error);
  };

  httpClient.interceptors.request.use(requestInterceptor);

  // FIX ME: (Currently not in use, but it may be useful in the future)
  httpClientWithoutAuthorization.interceptors.request.use(requestInterceptor);

  httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

  return { httpClient, httpClientWithoutAuthorization };
};

export { httpClient, httpClientWithoutAuthorization };
