// vite.config.ts
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath, URL } from "node:url";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./client", import.meta.url)),
      "@shared": fileURLToPath(new URL("./shared", import.meta.url)),
    },
  },
  css: {
    // you renamed it to CJS, so point Vite at it explicitly
    postcss: "./postcss.config.cjs",
  },
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    chunkSizeWarningLimit: 1200,
    rollupOptions: {
      output: {
        manualChunks: {
          react: ["react", "react-dom", "react-router-dom"],
          vendor: ["@tanstack/react-query", "framer-motion", "lucide-react"],
          radix: [
            "@radix-ui/react-slot",
            "@radix-ui/react-tabs",
            "@radix-ui/react-select",
            "@radix-ui/react-dialog",
            "@radix-ui/react-dropdown-menu",
            "@radix-ui/react-popover",
            "@radix-ui/react-tooltip",
            "@radix-ui/react-toast",
          ],
        },
      },
    },
  },
});
