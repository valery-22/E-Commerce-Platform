import apiClient from "./client";
import { ChatResponse, ChatMessage } from "@/types";

export const chatApi = {
  query: async (query: string, documentIds?: number[]): Promise<ChatResponse> => {
    const response = await apiClient.post<ChatResponse>("/chat/query", {
      query,
      document_ids: documentIds,
    });
    return response.data;
  },

  getHistory: async (limit: number = 50, offset: number = 0): Promise<ChatMessage[]> => {
    const response = await apiClient.get<ChatMessage[]>(
      `/chat/history?limit=${limit}&offset=${offset}`
    );
    return response.data;
  },
};