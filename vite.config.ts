// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist/spa',   // <-- matches Netlify's publish path in your logs
    target: 'es2019',
    sourcemap: false
  },
  server: { port: 5173, strictPort: true },
  preview: { port: 4173, strictPort: true }
})

