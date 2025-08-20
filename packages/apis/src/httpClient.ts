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

import { getCookie } from '@rhino/utils';
import { API_RESPONSES } from './constants';
import { VITE_WICKET_BASE_URL } from './endpoints';

interface ErrorNotificationService {
  showError: (message: string, type?: 'network' | 'server' | 'auth') => void;
  showRetryDialog: (onRetry: () => void) => void;
}

const errorNotificationService: ErrorNotificationService = {
  showError: (message: string, type?: 'network' | 'server' | 'auth') => {
    console.error(`${type?.toUpperCase() || 'ERROR'}: ${message}`);
  },
  showRetryDialog: (onRetry: () => void) => {
    const retry = confirm('Connection failed. Would you like to retry?');
    if (retry) onRetry();
  },
};

const checkNetworkConnectivity = async (): Promise<boolean> => {
  try {
    // Try to ping a reliable endpoint
    const response = await fetch('/health', {
      method: 'HEAD',
      cache: 'no-cache',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return navigator.onLine; // Fallback to browser's online status
  }
};

// Enhanced fetch adapter with better error handling
const fetchAdapter: AxiosAdapter = async (
  config: AxiosRequestConfig
): Promise<AxiosResponse> => {
  let urlWithParams = config.url || '';
  if (config.params) {
    const searchParams = new URLSearchParams();
    Object.entries(config.params).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });

    const queryString = searchParams.toString();
    if (queryString) {
      urlWithParams += (urlWithParams.includes('?') ? '&' : '?') + queryString;
    }
  }

  const url = config.baseURL
    ? `${config.baseURL}${urlWithParams}`
    : urlWithParams;

  const headers = new AxiosHeaders();
  if (config.headers) {
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
    signal: AbortSignal.timeout(config.timeout || 30000),
  };

  if (config.data) {
    fetchOptions.body = config.data;
  }

  try {
    const response = await fetch(url!, fetchOptions);

    if (response.status === 401) {
      document.cookie =
        'token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
      window.location.href = VITE_WICKET_BASE_URL + 'dashboard?-2.-logout';
      throw new Error(API_RESPONSES.unauthorized);
    }

    if (response.status === 403) {
      throw new Error(API_RESPONSES.forbidden);
    }

    if (response.status === 500) {
      errorNotificationService.showError(
        'Server encountered an error. Please try again later.',
        'server'
      );
      throw new Error(API_RESPONSES.internalServerError);
    }

    if (
      response.status === 502 ||
      response.status === 503 ||
      response.status === 504
    ) {
      throw new Error(API_RESPONSES.serviceUnavailable);
    }

    let responseData: unknown;
    try {
      responseData = await response.json();
    } catch (_error: unknown) {
      responseData = null;
    }

    if (!response.ok) {
      const errorData = responseData || { detail: '', title: '' };
      (errorData as any).response = {
        data: errorData,
        status: response.status,
        statusText: response.statusText,
        headers: response.headers,
        config,
      };
      throw errorData;
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
  } catch (error: any) {
    if (error.name === 'AbortError') {
      throw new Error('Request timeout');
    }

    if (error instanceof TypeError && error.message.includes('fetch')) {
      const isOnline = await checkNetworkConnectivity();
      if (!isOnline) {
        throw new Error('Network connection lost');
      } else {
        throw new Error('Server is not available');
      }
    }

    throw error;
  }
};

const httpClient: AxiosInstance = axios.create({
  adapter: fetchAdapter,
});
const httpClientWithoutAuthorization: AxiosInstance = axios.create({
  adapter: fetchAdapter,
});

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
    timeout: 30000,
  });

  Object.assign(httpClientWithoutAuthorization.defaults, {
    baseURL: baseURL,
    withCredentials: false,
    headers: defaultHeaders,
    timeout: 30000,
  });

  const requestInterceptor = (config: InternalAxiosRequestConfig<unknown>) => {
    config.withCredentials = false;

    if (!token) {
      window.location.href = VITE_WICKET_BASE_URL + 'login';
    }

    config.headers.Authorization = `Bearer ${token}`;
    return config;
  };

  const responseInterceptor = (response: AxiosResponse<unknown, unknown>) => {
    return response;
  };

  const errorInterceptor = async (error: any) => {
    const originalRequest = error.config;

    if (error.response) {
      const { status } = error.response;

      if (status === 401) {
        window.location.href = VITE_WICKET_BASE_URL + 'login';
        return Promise.reject(error);
      }

      if (status === 500) {
        errorNotificationService.showError('Server error occurred', 'server');
        return Promise.reject(error);
      }

      if (status >= 502 && status <= 504) {
        errorNotificationService.showError(
          'Service is temporarily unavailable',
          'server'
        );
        return Promise.reject(error);
      }
    } else if (error.message) {
      if (error.message === 'Request timeout') {
        errorNotificationService.showError(
          'Request timed out. Please check your connection and try again.',
          'network'
        );
      } else if (error.message === 'Network connection lost') {
        errorNotificationService.showError(
          'No internet connection. Please check your network.',
          'network'
        );
      } else if (error.message === 'Server is not available') {
        errorNotificationService.showError(
          'Cannot connect to server. Please try again later.',
          'server'
        );

        errorNotificationService.showRetryDialog(() => {
          if (originalRequest) {
            return httpClient.request(originalRequest);
          }
        });
      } else {
        console.error('Unexpected Error:', error.message);
        errorNotificationService.showError(
          'An unexpected error occurred',
          'network'
        );
      }
    } else {
      console.error('Unknown Error:', error);
      errorNotificationService.showError(
        'An unknown error occurred',
        'network'
      );
    }

    return Promise.reject(error);
  };

  httpClient.interceptors.request.use(requestInterceptor);
  httpClientWithoutAuthorization.interceptors.request.use(requestInterceptor);
  httpClient.interceptors.response.use(responseInterceptor, errorInterceptor);

  return { httpClient, httpClientWithoutAuthorization };
};

export const checkApiHealth = async (): Promise<boolean> => {
  try {
    const response = await fetch('/health', {
      method: 'HEAD',
      signal: AbortSignal.timeout(5000),
    });
    return response.ok;
  } catch {
    return false;
  }
};

export const retryRequest = async <T>(
  requestFn: () => Promise<T>,
  maxRetries: number = 3,
  delay: number = 1000
): Promise<T> => {
  let lastError: any;

  for (let i = 0; i <= maxRetries; i++) {
    try {
      return await requestFn();
    } catch (error: any) {
      lastError = error;

      if (i === maxRetries) break;

      if (error.response?.status >= 400 && error.response?.status < 500) {
        break;
      }

      await new Promise((resolve) =>
        setTimeout(resolve, delay * Math.pow(2, i))
      );
    }
  }

  throw lastError;
};

export { httpClient, httpClientWithoutAuthorization };
