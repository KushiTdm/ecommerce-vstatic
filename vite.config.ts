// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  
  define: {
    global: 'globalThis',
  },
  
  optimizeDeps: {
    exclude: ['lucide-react', 'dotenv'],
  },
  
  // Configuration pour le développement local
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  
  // ✅ AJOUT : Configuration pour le build de production
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // Vite copie automatiquement public/ vers dist/
    // Donc public/_redirects sera copié dans dist/_redirects
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom', 'react-router-dom'],
          store: ['zustand'],
          supabase: ['@supabase/supabase-js'],
        },
      },
    },
  },
  
  // Configuration pour tester le build en local
  preview: {
    port: 3000,
  },
});