import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { Buffer } from 'node:buffer'
import { cwd, env } from 'node:process'
import typecastTtsHandler from './api/tts.js'

const localTtsApi = (serverEnv) => ({
  name: 'local-tts-api',
  configureServer(server) {
    for (const key of ['TYPECAST_API_KEY', 'TYPECAST_VOICE_ID', 'UPSTASH_REDIS_REST_URL', 'UPSTASH_REDIS_REST_TOKEN']) {
      if (!env[key] && serverEnv[key]) env[key] = serverEnv[key]
    }

    server.middlewares.use('/api/tts', (req, res) => {
      const apiResponse = {
        status(code) {
          res.statusCode = code
          return this
        },
        setHeader(name, value) {
          res.setHeader(name, value)
        },
        json(body) {
          res.setHeader('Content-Type', 'application/json')
          res.end(JSON.stringify(body))
        },
        send(body) {
          res.end(body)
        },
      }

      if (req.method !== 'POST') {
        typecastTtsHandler(req, apiResponse)
        return
      }

      const chunks = []
      let size = 0
      let tooLarge = false
      req.on('data', (chunk) => {
        size += chunk.length
        if (size > 8192) {
          tooLarge = true
          chunks.length = 0
        } else if (!tooLarge) {
          chunks.push(chunk)
        }
      })
      req.on('end', async () => {
        if (tooLarge) {
          apiResponse.status(413).json({ error: 'Request is too large.' })
          return
        }
        try {
          req.body = JSON.parse(Buffer.concat(chunks).toString('utf8'))
          await typecastTtsHandler(req, apiResponse)
        } catch (error) {
          console.error('Local TTS request failed:', error)
          apiResponse.status(400).json({ error: 'Invalid request body.' })
        }
      })
    })
  },
})

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const serverEnv = loadEnv(mode, cwd(), '')
  return {
    cacheDir: env.PORTFOLIO_VITE_CACHE_DIR || undefined,
    plugins: [react(), localTtsApi(serverEnv)],
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
  }
})
