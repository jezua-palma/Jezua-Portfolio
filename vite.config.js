import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [react()],
    build: {
      // Production optimizations
      cssCodeSplit: true,
      chunkSizeWarningLimit: 600,
      rollupOptions: {
        output: {
          // Split vendor chunks for better caching (function format for Rolldown/Vite 8)
          manualChunks(id) {
            if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) {
              return 'vendor-react';
            }
            if (id.includes('node_modules/framer-motion')) {
              return 'vendor-motion';
            }
            if (id.includes('node_modules/gsap')) {
              return 'vendor-gsap';
            }
            if (id.includes('node_modules/lucide-react')) {
              return 'vendor-icons';
            }
          },
        },
      },
    },
    server: {
      proxy: {
        '/api/tts': {
          target: 'https://api.typecast.ai',
          changeOrigin: true,
          rewrite: () => '/v1/text-to-speech',
          configure: (proxy) => {
            proxy.on('proxyReq', (proxyReq) => {
              // Inject the API key header server-side so it's never exposed to the browser
              const apiKey = env.TYPECAST_API_KEY || env.VITE_TYPECAST_API_KEY || ''
              if (apiKey) {
                proxyReq.setHeader('X-API-KEY', apiKey)
              }
            })
          }
        }
      }
    }
  }
})
