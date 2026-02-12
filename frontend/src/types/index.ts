export interface User {
  id: number;
  email: string;
  username: string;
  company_name: string;
  is_active: boolean;
  created_at: string;
}

export interface AuthTokens {
  access_token: string;
  refresh_token: string;
  token_type: string;
  expires_in: number;
}

export interface Document {
  id: number;
  filename: string;
  original_filename: string;
  file_type: string;
  file_size: number;
  chunk_count: number;
  is_processed: boolean;
  processing_status: "pending" | "processing" | "completed" | "failed";
  created_at: string;
  updated_at: string;
}

export interface ChatMessage {
  id: number;
  user_query: string;
  ai_response: string;
  relevance_score: number;
  response_time_ms: number;
  created_at: string;
}

export interface ChatSource {
  document_id: number;
  document_name: string;
  chunk_id: number;
  relevance: number;
}

export interface ChatResponse {
  response: string;
  source_documents: ChatSource[];
  relevance_score: number;
  response_time_ms: number;
}

export interface AnalyticsSummary {
  total_documents: number;
  total_queries: number;
  queries_24h: number;
  avg_response_time_ms: number;
  avg_relevance_score: number;
}

export interface ApiError {
  status: number;
  message: string;
  detail?: string;
}