import apiClient from "./client";


export const authApi = {
  register: async (
    email: string,
    username: string,
    password: string,
    company_name: string
  ): Promise<AuthTokens> => {
    const response = await apiClient.post<AuthTokens>("/auth/register", {
      email,
      username,
      password,
      company_name,
    });
    return response.data;
  },

  login: async (email: string, password: string): Promise<AuthTokens> => {
    const response = await apiClient.post<AuthTokens>("/auth/login", {
      email,
      password,
    });
    return response.data;
  },

  getProfile: async (): Promise<User> => {
    const response = await apiClient.get<User>("/auth/me");
    return response.data;
  },

  logout: () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  },
};