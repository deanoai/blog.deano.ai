/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f0f7ff',
          100: '#e0effe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c3d66',
        },
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#374151',
            a: {
              color: '#0284c7',
              '&:hover': {
                color: '#0369a1',
              },
            },
            code: {
              color: '#dc2626',
              backgroundColor: '#fef2f2',
              padding: '2px 6px',
              borderRadius: '4px',
              fontWeight: '500',
            },
            'code::before': {
              content: '""',
            },
            'code::after': {
              content: '""',
            },
            pre: {
              backgroundColor: '#1f2937',
              color: '#f3f4f6',
            },
          },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
