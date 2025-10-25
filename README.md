# Mark Joseph Livado | Portfolio

This is the source code for my portfolio website: [markromolecule.dev](https://markromolecule.dev)

## Tech Stack

- [React](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com)
- [ShadCN UI](https://ui.shadcn.com)
- [Zustand](https://zustand.docs.pmnd.rs/getting-started/introduction)

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/markromolecule/markromolecule.dev.git
   cd markromolecule.dev
   ```

2. Install dependencies
   ```bash
   pnpm install
   pnpm build
   ```

3. Configure environment variables (optional)
   ```bash
   cp portfolio/.env.example portfolio/.env
   # Edit .env and add your Gemini API key for chat functionality
   ```

4. Start the development server
   ```bash
   cd portfolio
   pnpm dev
   ```

5. Open your browser and navigate to `http://localhost:5173` to view the application.

## Chat Feature Setup

The portfolio includes an AI chat assistant powered by Google's Gemini API. To enable this feature:

1. Get a Gemini API key from [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Set the `GEMINI_API_KEY` environment variable in your deployment environment
3. For local development, the chat will show a fallback message if not configured

### Vercel Deployment
Add the environment variable in your Vercel dashboard:
- Variable name: `GEMINI_API_KEY`
- Value: Your Gemini API key

## Connect with Me
- [GitHub](https://github.com/markromolecule)
- [LinkedIn](https://www.linkedin.com/in/mark-joseph-livado-01945b331/)
- [Email](mailto:livadomc@gmail.com)