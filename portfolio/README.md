# S4INT Portfolio

A modern, minimalist portfolio website built with React, TypeScript, Tailwind CSS, and shadcn/ui.

## Features

- **Responsive Design**: Mobile-first approach with smooth responsive breakpoints
- **Modern UI**: Clean, minimalist design with subtle animations
- **Accessibility**: Semantic HTML and proper ARIA labels
- **Performance**: Optimized build with Vite
- **State Management**: Zustand for global UI state management
- **Component Library**: shadcn/ui components for consistency

## Tech Stack

- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui, Radix UI
- **State Management**: Zustand with Immer
- **Build Tool**: Vite
- **Icons**: Lucide React
- **API**: Vercel Serverless Functions
- **AI**: Google Gemini API (via secure backend)

## Project Structure

```
src/
├── components/           # Reusable components
│   ├── ui/             # shadcn/ui components
│   ├── Header.tsx      # Navigation header
│   ├── Hero.tsx        # Hero section
│   ├── About.tsx       # About section
│   ├── TechStack.tsx   # Tech stack grid
│   ├── Projects.tsx    # Projects showcase
│   ├── Achievements.tsx # Achievements timeline
│   └── Footer.tsx      # Footer
├── stores/             # Zustand stores
│   └── use-ui-store.ts # UI state management
├── lib/                # Utilities
│   └── utils.ts        # Helper functions
└── App.tsx             # Main app component
```

## Sections

1. **Hero**: Name, tagline, and call-to-action buttons
2. **About Me**: Personal introduction and background
3. **Tech Stack**: Grid of technologies and tools
4. **Projects**: Card-based project showcase
5. **Achievements**: Timeline of accomplishments
6. **Footer**: Contact information and social links

## Development

### Environment Setup

Create a `.env` file in the root directory with the following variable:

```env
# Gemini API Key (Server-side only - used by Vercel serverless function)
GEMINI_API_KEY=your_gemini_api_key_here
```

Get your API key from: https://makersuite.google.com/app/apikey

**Important**: The API key is **NOT** prefixed with `VITE_` because it's used server-side in the `/api/chat.ts` serverless function, keeping it secure and hidden from the browser.

### Commands

```bash
# Install dependencies
pnpm install

# Start development server
pnpm run dev

# Build for production
pnpm run build

# Preview production build
pnpm run preview
```

## Design Principles

- **Minimalist**: Clean, uncluttered interface
- **Responsive**: Mobile-first design approach
- **Accessible**: Semantic HTML and proper contrast
- **Performance**: Optimized loading and smooth interactions
- **Consistent**: Unified design system with shadcn/ui

## Customization

The portfolio is easily customizable:

- Update personal information in component files
- Modify the tech stack in `TechStack.tsx`
- Add/remove projects in `Projects.tsx`
- Update achievements in `Achievements.tsx`
- Customize colors and styling in Tailwind classes

## Deployment

### Vercel (Recommended)

This portfolio uses Vercel serverless functions for the AI chat feature. To deploy:

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add the environment variable in Vercel dashboard:
   - Key: `GEMINI_API_KEY`
   - Value: Your Google Gemini API key
4. Deploy!

The serverless function in `/api/chat.ts` will automatically be deployed alongside your static site.

### Other Platforms

For other platforms (Netlify, GitHub Pages, AWS S3), you'll need to:
- Set up your own backend API endpoint to handle the chat requests
- Update the fetch URL in `src/services/chat/gemini-chat-service.ts`
- Configure environment variables on your chosen platform