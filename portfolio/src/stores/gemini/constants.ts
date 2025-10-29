import { type ChatStoreState } from './types';

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