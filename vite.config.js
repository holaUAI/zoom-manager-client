import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: './postcss.config.js'
  },
  server: {
    host: true,
    port: 5173
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})
