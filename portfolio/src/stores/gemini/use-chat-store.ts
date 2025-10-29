import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { type ChatStore, type Message } from './types';
import { DEFAULT_CHAT_STORE_STATE } from './constants';
import { generateMessageId } from '../shared/store-utils';

export const useChatStore = create(
  immer<ChatStore>((set) => ({
    ...DEFAULT_CHAT_STORE_STATE,

    /* Actions */
    addMessage: (message) => {
      set((state) => {
        const newMessage: Message = {
          ...message,
          id: generateMessageId(state.messages.length),
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
        state.messages = [...DEFAULT_CHAT_STORE_STATE.messages];
      });
    },

    reset: () => {
      set((state) => {
        Object.assign(state, DEFAULT_CHAT_STORE_STATE);
      });
    },
  }))
);