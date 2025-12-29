import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  build: {
    // Increase the warning limit slightly to 1000kb to reduce noise
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        // Separate heavy libraries into their own files for better caching and loading
        manualChunks: {
          'vendor': ['react', 'react-dom'],
          'genai': ['@google/genai'],
          'ui': ['react-markdown']
        }
      }
    }
  }
})