// lib/design-tokens.ts
/**
 * Hero Journey Design System Tokens
 * Centralized design values for consistent theming
 */

export const designTokens = {
  colors: {
    primary: '#7C3AED',
    primarySoft: '#A855F7',
    bgLight: '#F6F7FB',
    bgDark: '#050816',
    card: '#FFFFFF',
    cardSoft: '#F1F2F7',
    textMain: '#111827',
    textSoft: '#6B7280',
  },
  
  shadows: {
    base: '0 18px 40px rgba(15, 23, 42, 0.22)',
    strong: '0 28px 70px rgba(15, 23, 42, 0.32)',
    inner: 'inset 0 0 20px rgba(255, 255, 255, 0.22)',
  },
  
  radius: {
    sm: '0.75rem',  // 12px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '1.75rem',  // 28px (3xl in Tailwind)
    '2xl': '2.25rem', // 36px (4xl in Tailwind)
  },
  
  spacing: {
    section: '1.5rem',  // 24px
    card: '1.25rem',    // 20px
    element: '0.75rem', // 12px
  },
  
  animation: {
    duration: {
      fast: '150ms',
      normal: '200ms',
      slow: '300ms',
    },
    easing: {
      smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
      bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
    },
  },
  
  typography: {
    hero: {
      size: '2rem',      // 32px
      weight: '700',
      lineHeight: '1.2',
    },
    title: {
      size: '1.25rem',   // 20px
      weight: '600',
      lineHeight: '1.4',
    },
    body: {
      size: '0.875rem',  // 14px
      weight: '400',
      lineHeight: '1.5',
    },
    caption: {
      size: '0.75rem',   // 12px
      weight: '500',
      lineHeight: '1.4',
    },
  },
} as const;

export type DesignTokens = typeof designTokens;
