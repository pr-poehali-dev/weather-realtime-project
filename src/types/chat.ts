
export type MessageRole = 'user' | 'assistant' | 'system';

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  timestamp: number;
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  model: AiModel;
  createdAt: number;
  updatedAt: number;
}

export interface AiModel {
  id: string;
  name: string;
  description: string;
  maxTokens: number;
  avatar?: string;
}

export type ChatState = {
  sessions: ChatSession[];
  currentSessionId: string | null;
  isLoading: boolean;
  error: string | null;
};
