import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

// Change from let to const and provide initial values
const httpClient: AxiosInstance = axios.create({});
const httpClientWithoutAccessor: AxiosInstance = axios.create({});

export const initHttpClient = (baseURL?: string) => {
  // Instead of reassignment, update the instance configurations
  Object.assign(httpClient.defaults, {
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `,
    },
  });

  Object.assign(httpClientWithoutAccessor.defaults, {
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer`,
    },
  });

  const requestInterceptor = (config: InternalAxiosRequestConfig<unknown>) => {
    config.headers.Authorization = `Bearer`;

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
