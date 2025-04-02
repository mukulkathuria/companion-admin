import path from 'path';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import * as fs from 'fs';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    target: 'esnext',
    outDir: 'dist',
    assetsDir: 'assets', 
    sourcemap: false, 
    minify: 'esbuild', 
    assetsInlineLimit: 8000,
    chunkSizeWarningLimit: 500, 
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  server: {
    // https:{
    //   key: fs.readFileSync('certificates/localhost-key.pem'),
    //   cert: fs.readFileSync('certificates/localhost.pem')
    // },
    port: 3002,
  },
});
