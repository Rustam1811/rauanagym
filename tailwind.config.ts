import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Hero Journey Design System
        hj: {
          primary: '#7C3AED',
          primarySoft: '#A855F7',
          bgLight: '#F6F7FB',
          bgDark: '#050816',
          card: '#FFFFFF',
          cardSoft: '#F1F2F7',
          textMain: '#111827',
          textSoft: '#6B7280',
        },
        // Legacy colors
        primary: '#7C3AED',
        primarySoft: '#A855F7',
        bgDark: '#050814',
        bgLight: '#F3F4F6',
        cardLight: '#FFFFFF',
        cardDark: '#111827',
        accentGreen: '#22C55E',
        accentRed: '#EF4444',
        accentYellow: '#EAB308',
        textPrimary: '#111827',
        textSecondary: '#6B7280',
        borderSoft: 'rgba(15,23,42,0.08)',
        // Premium dark theme
        dark: {
          bg: '#0A0A0F',
          card: '#1A1A24',
          border: '#2A2A38',
        },
        // Light/gray theme
        light: {
          bg: '#F5F5F7',
          card: '#FFFFFF',
          border: '#E5E5E7',
        },
        neon: {
          purple: '#A855F7',
          pink: '#EC4899',
          blue: '#3B82F6',
          green: '#10B981',
        },
        // Premium gradient accent
        accent: {
          blue: '#4F80FF',
          cyan: '#6CEFFF',
          '50': '#F0F9FF',
          '100': '#E0F4FF',
          '200': '#BAE6FF',
          '300': '#7DD3FC',
          '400': '#38BDF8',
          '500': '#4F80FF',
          '600': '#0284C7',
          '700': '#0369A1',
          '800': '#075985',
          '900': '#0C4A6E',
        },
        // Neutral palette
        gray: {
          '50': '#FAFAFA',
          '100': '#F5F5F5',
          '200': '#E5E5E5',
          '300': '#D4D4D4',
          '400': '#A3A3A3',
          '500': '#737373',
          '600': '#525252',
          '700': '#404040',
          '800': '#262626',
          '900': '#171717',
        },
        // Status colors
        success: '#10B981',
        warning: '#F59E0B',
        error: '#EF4444',
        info: '#3B82F6',
        // Glass effect
        glass: {
          white: 'rgba(255, 255, 255, 0.7)',
          border: 'rgba(255, 255, 255, 0.2)',
        },
      },
      backgroundImage: {
        'gradient-hero': 'linear-gradient(180deg, #050814, #111827, #020617)',
        'gradient-profile': 'radial-gradient(circle at top, #BBF7D0, #ECFEFF, #F9FAFB)',
        'gradient-card-purple': 'linear-gradient(135deg, #4C1D95, #7C3AED, #A855F7)',
        'gradient-accent': 'linear-gradient(135deg, #4F80FF 0%, #6CEFFF 100%)',
        'gradient-accent-hover': 'linear-gradient(135deg, #3A70EF 0%, #5CDFEF 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
        // Hero Journey backgrounds
        'hj-screen': 'radial-gradient(circle at 0% 0%, #C4B5FD 0, transparent 45%), radial-gradient(circle at 100% 0%, #FDE68A 0, transparent 40%), linear-gradient(to bottom, #F9FAFB, #E5E7EB)',
      },
      boxShadow: {
        'soft': '0 10px 30px rgba(15, 23, 42, 0.18)',
        'strong': '0 20px 60px rgba(0, 0, 0, 0.45)',
        'card': '0 2px 16px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 24px rgba(0, 0, 0, 0.12)',
        'premium': '0 8px 32px rgba(124, 58, 237, 0.15)',
        'glow': '0 0 24px rgba(124, 58, 237, 0.4)',
        'button': '0 4px 12px rgba(79, 128, 255, 0.25)',
        'inner-glow': 'inset 0 1px 2px rgba(255, 255, 255, 0.5)',
        // Hero Journey shadows
        'hj': '0 18px 40px rgba(15, 23, 42, 0.22)',
        'hj-strong': '0 28px 70px rgba(15, 23, 42, 0.32)',
        'hj-inner': 'inset 0 0 20px rgba(255, 255, 255, 0.22)',
      },
      borderRadius: {
        'xl': '16px',
        '2xl': '24px',
        '3xl': '1.75rem',
        '4xl': '2.25rem',
      },
      backdropBlur: {
        'xs': '2px',
        'glass': '12px',
      },
      animation: {
        'scale-in': 'scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'slide-up': 'slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
        'fade-in': 'fadeIn 0.3s ease-out',
        'bounce-subtle': 'bounceSubtle 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        bounceSubtle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-4px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(108, 239, 255, 0.4)' },
          '50%': { boxShadow: '0 0 40px rgba(108, 239, 255, 0.6)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
