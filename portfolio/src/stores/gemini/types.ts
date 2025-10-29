import { type AsyncState } from '../shared/store-types';

export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export type ChatStoreState = {
  messages: Message[];
  isOpen: boolean;
} & AsyncState;

export type ChatStoreActions = {
  addMessage: (message: Omit<Message, 'id' | 'timestamp'>) => void;
  setMessages: (messages: Message[]) => void;
  toggleChat: () => void;
  setChatOpen: (isOpen: boolean) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  clearMessages: () => void;
  reset: () => void;
};

export type ChatStore = ChatStoreState & ChatStoreActions;