
export const GEMINI_API_CONSTANTS = {
    // Error Messages
    ERRORS: {
        UNAUTHORIZED: "Unauthorized: Invalid Gemini API key.",
        FORBIDDEN: "Forbidden: Access to Gemini API is denied.", 
        RATE_LIMIT: "Too Many Requests: Rate limit exceeded for Gemini API.",
        SERVER_ERROR: "Internal Server Error: Gemini API encountered an unexpected error.",
        INVALID_RESPONSE: "Invalid Gemini API response format.",
        MISSING_API_KEY: "Missing Gemini API key in environment variables.",
        CONFIGURATION_ERROR: "Gemini Configuration Error:",
        INVALID_RESPONSE_ERROR: "Gemini Invalid Response Error:",
    },

    // HTTP Status Codes
    STATUS_CODES: {
        UNAUTHORIZED: 401,
        FORBIDDEN: 403,
        TOO_MANY_REQUESTS: 429,
        INTERNAL_SERVER_ERROR: 500,
    },

    // HTTP Methods
    HTTP_METHODS: {
        GET: 'GET',
        POST: 'POST',
        PUT: 'PUT',
        DELETE: 'DELETE',
        PATCH: 'PATCH',
        OPTIONS: 'OPTIONS',
        HEAD: 'HEAD',
    },

    // API roles
    ROLES: {
        USER: 'user' as const,
        MODEL: 'model' as const,
        ASSISTANT: 'assistant' as const,
        SYSTEM: 'system' as const,
    },

    // Response Default
    DEFAULTS: {
        SUCCESS: true,
        EMPTY_RESPONSE: '',
        DEFAULT_ERROR_MESSAGE: 'An unexpected error occurred.',
    },

    // Request Configurations
    REQUEST: {
        TIMEOUT_MS: 30000,
        RETRY_ATTEMPTS: 3,
    }

} as const;

// Environment Constants
export const GEMINI_ENV_CONSTANTS = {
    DEVELOPMENT_API_KEY_VAR: 'VITE_GEMINI_API_KEY',
    CHAT_ENDPOINT: '/api/chat',
} as const;

// Content-type Constants
export const GEMINI_HEADER = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
} as const;

export const RESPONSE_KEYS = {
    RESPONSE: 'response',
    SUCCESS: 'success',
    ERROR: 'error',
    CONTENTS: 'contents',
} as const;