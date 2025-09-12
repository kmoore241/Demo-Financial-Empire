// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ command, mode }) => ({
  plugins: [react()],
  build: {
   outDir: 'dist/spa'
    sourcemap: false,
  },
}));
