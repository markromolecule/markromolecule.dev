import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Message = {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
};

export type ChatStoreState = {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  error: string | null;
};

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

export const DEFAULT_CHAT_STORE_STATE: ChatStoreState = {
  messages: [
    {
      id: '1',
      text: "Hi! I'm Joseph's AI assistant. I can help you learn more about his skills, projects, and experience. I can also provide his contact information and social links. What would you like to know?",
      isUser: false,
      timestamp: new Date(),
    },
  ],
  isOpen: false,
  isLoading: false,
  error: null,
};

export type ChatStore = ChatStoreState & ChatStoreActions;

export const useChatStore = create(
  immer<ChatStore>((set) => ({
    ...DEFAULT_CHAT_STORE_STATE,

    /* Actions */
    addMessage: (message) => {
      set((state) => {
        const newMessage: Message = {
          ...message,
          id: Date.now().toString(),
          timestamp: new Date(),
        };
        state.messages.push(newMessage);
      });
    },

    setMessages: (messages) => {
      set((state) => {
        state.messages = messages;
      });
    },

    toggleChat: () => {
      set((state) => {
        state.isOpen = !state.isOpen;
      });
    },

    setChatOpen: (isOpen) => {
      set((state) => {
        state.isOpen = isOpen;
      });
    },

    setLoading: (isLoading) => {
      set((state) => {
        state.isLoading = isLoading;
      });
    },

    setError: (error) => {
      set((state) => {
        state.error = error;
      });
    },

    clearMessages: () => {
      set((state) => {
        state.messages = DEFAULT_CHAT_STORE_STATE.messages;
      });
    },

    reset: () => {
      set((state) => {
        Object.assign(state, DEFAULT_CHAT_STORE_STATE);
      });
    },
  }))
);
