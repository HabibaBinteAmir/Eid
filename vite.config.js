import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],
  theme: {
  extend: {
    keyframes: {
      shimmer: {
        '0%': { backgroundPosition: '200% center' },
        '100%': { backgroundPosition: '-200% center' },
      },
    },
    animation: {
      shimmer: 'shimmer 2s linear infinite',
    },
  },
},
})
