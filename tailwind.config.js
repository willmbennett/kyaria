/** @type {import('tailwindcss').Config} */
import { fontFamily as _fontFamily } from 'tailwindcss/defaultTheme';

export const future = {
  hoverOnlyWhenSupported: true,
};
export const content = [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
];
export const variants = {
  extend: {
    display: ["group-hover"],
  },
};
export const theme = {
  extend: {
    fontFamily: {
      sans: ['Inter', ..._fontFamily.sans],
    },
    colors: {
      'dartmouth-green': '#00703C',
      'amber-50': '#FFF9EB',
      'amber-100': '#FEF6E1',
      vanilla: '#FFFEF8',
      'purple-light': '#F3F2F5',
      'purple-dark': '#A59EB2',
      'gray-secondary': {
        50: '#f7f7f5',
        100: '#edece7',
        200: '#dbe0e2',
        300: '#c2ccce',
        400: '#9eadb2',
      },
      border: 'hsl(var(--border))',
      input: 'hsl(var(--input))',
      ring: 'hsl(var(--ring))',
      background: 'hsl(var(--background))',
      foreground: 'hsl(var(--foreground))',
      primary: {
        DEFAULT: 'hsl(var(--primary))',
        foreground: 'hsl(var(--primary-foreground))'
      },
      secondary: {
        DEFAULT: 'hsl(var(--secondary))',
        foreground: 'hsl(var(--secondary-foreground))'
      },
      destructive: {
        DEFAULT: 'hsl(var(--destructive))',
        foreground: 'hsl(var(--destructive-foreground))'
      },
      muted: {
        DEFAULT: 'hsl(var(--muted))',
        foreground: 'hsl(var(--muted-foreground))'
      },
      accent: {
        DEFAULT: 'hsl(var(--accent))',
        foreground: 'hsl(var(--accent-foreground))'
      },
      popover: {
        DEFAULT: 'hsl(var(--popover))',
        foreground: 'hsl(var(--popover-foreground))'
      },
      card: {
        DEFAULT: 'hsl(var(--card))',
        foreground: 'hsl(var(--card-foreground))'
      }
    },
    fontSize: {
      md: '15px',
    },
    lineHeight: {
      tighter: '1.15',
    },

    keyframes: {
      infiniteScroll: {
        '0%': { transform: 'translateX(0%)' },
        '100%': { transform: 'translateX(-50%)' },
      },
      'accordion-down': {
        from: { height: '0' },
        to: { height: 'var(--radix-accordion-content-height)' }
      },
      'accordion-up': {
        from: { height: 'var(--radix-accordion-content-height)' },
        to: { height: '0' }
      }
    },

    animation: {
      'accordion-down': 'accordion-down 0.2s ease-out',
      'accordion-up': 'accordion-up 0.2s ease-out',
      infiniteScroll: 'infiniteScroll 60s linear infinite',
    },
  },
};
export const plugins = [require("@tailwindcss/forms"), require("@headlessui/tailwindcss"), require('tailwindcss-animate'), require('@tailwindcss/typography')];
