import apiClient from "./client";
import { Document } from "@/types";

export const documentsApi = {
  upload: async (file: File): Promise<Document> => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post<Document>("/documents/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  },

  list: async (): Promise<Document[]> => {
    const response = await apiClient.get<Document[]>("/documents/");
    return response.data;
  },

  delete: async (documentId: number): Promise<{ message: string }> => {
    const response = await apiClient.delete<{ message: string }>(`/documents/${documentId}`);
    return response.data;
  },

  getById: async (documentId: number): Promise<Document> => {
    const response = await apiClient.get<Document>(`/documents/${documentId}`);
    return response.data;
  },
};