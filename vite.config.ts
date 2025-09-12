// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  build: {
    outDir: 'dist/spa',   // matches your netlify.toml publish path
    sourcemap: false,
  },
  // If you had a dev proxy, keep it here (no express needed):
  // server: { proxy: { '/api': 'http://localhost:3001' } },
}));
