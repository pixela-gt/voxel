import type { Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{vue,js,ts,jsx,tsx}',
    '../../playground/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary-base)',
          darken: 'var(--color-primary-darken-1)',
          lighten: 'var(--color-primary-lighten-1)',
        },
        secondary: {
          DEFAULT: 'var(--color-secondary-base)',
          darken: 'var(--color-secondary-darken-1)',
          lighten: 'var(--color-secondary-lighten-1)',
        },
        info: {
          DEFAULT: 'var(--color-info-base)',
          darken: 'var(--color-info-darken-1)',
          lighten: 'var(--color-info-lighten-1)',
        },
        error: {
          DEFAULT: 'var(--color-error-base)',
          darken: 'var(--color-error-darken-1)',
          lighten: 'var(--color-error-lighten-1)',
        },
        warning: {
          DEFAULT: 'var(--color-warning-base)',
          darken: 'var(--color-warning-darken-1)',
          lighten: 'var(--color-warning-lighten-1)',
        },
        success: {
          DEFAULT: 'var(--color-success-base)',
          darken: 'var(--color-success-darken-1)',
          lighten: 'var(--color-success-lighten-1)',
        },
        surface: {
          background: 'var(--color-surface-background)',
          base: 'var(--color-surface-base)',
          light: 'var(--color-surface-light)',
        },
        grey: {
          400: 'var(--color-grey-400)',
          600: 'var(--color-grey-600)',
          800: 'var(--color-grey-800)',
          900: 'var(--color-grey-900)',
          950: 'var(--color-grey-950)',
        },
        text: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          inverse: 'var(--color-text-inverse)',
          'on-primary': 'var(--color-text-on-primary)',
          'on-secondary': 'var(--color-text-on-secondary)',
          muted: 'var(--color-text-muted)',
        },
      },
      fontFamily: {
        sans: ['var(--font-family-sans)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['var(--font-size-2xs)', { lineHeight: '16px', letterSpacing: '0.2px' }],
        xs: ['var(--font-size-xs)', { lineHeight: '16px', letterSpacing: '0.06px' }],
        sm: ['var(--font-size-sm)', { lineHeight: '20px', letterSpacing: '0.07px' }],
        base: ['var(--font-size-base)', { lineHeight: '24px', letterSpacing: '0.08px' }],
        lg: ['var(--font-size-lg)', { lineHeight: '28px', letterSpacing: '0.09px' }],
        xl: ['var(--font-size-xl)', { lineHeight: '36px', letterSpacing: '0.12px' }],
        '2xl': ['var(--font-size-2xl)', { lineHeight: '38px', letterSpacing: '0.12px' }],
        '3xl': ['var(--font-size-3xl)', { lineHeight: '44px', letterSpacing: '0.14px' }],
        '4xl': ['var(--font-size-4xl)', { lineHeight: '50px', letterSpacing: '0.16px' }],
        '5xl': ['var(--font-size-5xl)', { lineHeight: '56px', letterSpacing: '0.18px' }],
        '6xl': ['var(--font-size-6xl)', { lineHeight: '70px', letterSpacing: '0.22px' }],
        '7xl': ['var(--font-size-7xl)', { lineHeight: '88px', letterSpacing: '0.28px' }],
      },
      borderRadius: {
        xs: 'var(--rounded-xs)',
        sm: 'var(--rounded-sm)',
        md: 'var(--rounded-md)',
        lg: 'var(--rounded-lg)',
        xl: 'var(--rounded-xl)',
        '2xl': 'var(--rounded-2xl)',
        '3xl': 'var(--rounded-3xl)',
        full: 'var(--rounded-full)',
      },
      boxShadow: {
        sm: 'var(--shadow-sm)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
        xl: 'var(--shadow-xl)',
        '2xl': 'var(--shadow-2xl)',
      },
      transitionDuration: {
        fast: '150ms',
        normal: '200ms',
        slow: '300ms',
      },
      spacing: {
        1: 'var(--space-1)',
        2: 'var(--space-2)',
        3: 'var(--space-3)',
        4: 'var(--space-4)',
        5: 'var(--space-5)',
        6: 'var(--space-6)',
        7: 'var(--space-7)',
        8: 'var(--space-8)',
      },
    },
  },
  plugins: [],
} satisfies Config