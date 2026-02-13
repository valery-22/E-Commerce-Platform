import axios, {
  AxiosInstance,
  AxiosError,
  InternalAxiosRequestConfig,
  AxiosResponse,
} from "axios";

const API_BASE_URL: string =
  import.meta.env.VITE_API_URL ?? "http://localhost:8000/api";

interface RequestConfig extends InternalAxiosRequestConfig {
  _retry?: boolean;
}

class ApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    // Request interceptor
    this.client.interceptors.request.use((config: RequestConfig) => {
      const token = this.getAccessToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });

    // Response interceptor
    this.client.interceptors.response.use(
      (response: AxiosResponse) => response,
      async (error: unknown) => {
        if (axios.isAxiosError(error)) {
          const config = error.config as RequestConfig | undefined;

          if (error.response?.status === 401 && config && !config._retry) {
            config._retry = true;
            this.clearTokens();
            window.location.href = "/login";
          }
        }

        return Promise.reject(error);
      }
    );
  }

  private getAccessToken(): string | null {
    return localStorage.getItem("access_token");
  }

  private clearTokens(): void {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  }

  public get<T>(url: string, config?: RequestConfig): Promise<AxiosResponse<T>> {
    return this.client.get<T>(url, config);
  }

  public post<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.post<T>(url, data, config);
  }

  public put<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.put<T>(url, data, config);
  }

  public patch<T>(
    url: string,
    data?: unknown,
    config?: RequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.patch<T>(url, data, config);
  }

  public delete<T>(
    url: string,
    config?: RequestConfig
  ): Promise<AxiosResponse<T>> {
    return this.client.delete<T>(url, config);
  }

  public getClient(): AxiosInstance {
    return this.client;
  }
}

export default new ApiClient();
