import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  base: './', // 👈 ensures assets are referenced relatively (./assets/...)
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'dist', // default, but explicitly set for clarity
  },
});