import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  // mode: 'development' | 'production' — .env.local, .env.[mode] 순으로 로드
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [react()],
    server: {
      allowedHosts: [
        'localhost'
      ],
      proxy: {
        // /api/* 요청을 Spring Boot 서버로 프록시 (개발 환경 CORS 우회)
        '/api': {
          target: env.VITE_API_URL || 'http://localhost:8080',
          changeOrigin: true,
        },
      },
    },
  }
})
