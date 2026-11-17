import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '')
  const port = Number(env.FRONT_PORT || '3021')

  return {
    plugins: [react()],
    server: { port, host: '0.0.0.0' },
    preview: { port, host: '0.0.0.0' },
  }
})
