# Copilot Instructions

<!-- Use this file to provide workspace-specific custom instructions to Copilot. For more details, visit https://code.visualstudio.com/docs/copilot/copilot-customization#_use-a-githubcopilotinstructionsmd-file -->

## Project Overview
This is a production-ready fitness web app built with Next.js 14+ App Router, TypeScript, Tailwind CSS, and Firebase.

## Tech Stack
- **Framework**: Next.js 14+ with App Router (src/app directory)
- **Language**: TypeScript (strict mode)
- **Styling**: Tailwind CSS (mobile-first approach)
- **Backend**: Firebase (Auth, Firestore, Storage)
- **Video**: react-player for playback, ffmpeg.wasm for compression
- **Icons**: lucide-react

## Key Conventions
- Use server components by default, client components only when needed ('use client')
- Keep Firebase logic in `src/lib/firebase/` modules
- All Firestore documents have TypeScript interfaces in `src/types/`
- Use consistent naming: PascalCase for components, camelCase for functions
- Mobile-first responsive design with Tailwind
- Premium, clean UI with proper spacing and modern aesthetics

## Architecture
- `/app` - App Router pages and layouts
- `/components` - Reusable UI components
- `/lib` - Utility functions and Firebase logic
- `/types` - TypeScript interfaces for all data models
- `/hooks` - Custom React hooks

## Firebase Collections
- users: User profiles with gamification data
- programs: Workout programs
- workouts: Individual workouts within programs
- exercises: Exercise library with videos
- sessions: Completed workout sessions
- stories: Instagram-like stories feature

## Best Practices
- Always type props and function parameters
- Use async/await for Firebase operations
- Handle loading and error states
- Implement proper authentication checks
- Keep components small and focused
- Use Tailwind utility classes, avoid custom CSS
