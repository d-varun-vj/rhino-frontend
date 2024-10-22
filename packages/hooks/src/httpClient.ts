import axios, {
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';

let httpClient: AxiosInstance;
let httpClientWithoutAccessor: AxiosInstance;

export const initHttpClient = async (baseURL?: string) => {
  httpClient = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer `,
    },
  });

  httpClientWithoutAccessor = axios.create({
    baseURL: baseURL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer`,
    },
  });

  const requestInterceptor = async (
    config: InternalAxiosRequestConfig<any>,
  ) => {
    config.headers.Authorization = `Bearer`;

    return config;
  };

  const responseInterceptor = (response: AxiosResponse<any, any>) => {
    return response;
  };

  httpClient.interceptors.request.use(requestInterceptor);
  httpClientWithoutAccessor.interceptors.request.use(requestInterceptor);
  httpClient.interceptors.response.use(responseInterceptor);

  return { httpClient, httpClientWithoutAccessor };
};

export { httpClient, httpClientWithoutAccessor };
