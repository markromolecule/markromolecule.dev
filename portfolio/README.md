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

The project builds to static files that can be deployed to any static hosting service:

- Vercel
- Netlify
- GitHub Pages
- AWS S3 + CloudFront