import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // Increase chunk size warning limit
    chunkSizeWarningLimit: 1000,
    // Enable source maps only in development
    sourcemap: false,
    // Use default esbuild minifier (no external terser dependency)
    target: 'es2015',
    cssCodeSplit: true,
  },
  // Optimize dependencies
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', '@mui/material', '@mui/icons-material'],
    exclude: [],
  },
  server: {
    proxy: {
      '/api/external': {
        target: 'https://thedanbro.com/bbho/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/external/, ''),
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
        },
      },
    },
  },
})
