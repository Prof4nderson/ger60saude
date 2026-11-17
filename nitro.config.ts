import { defineNitroConfig } from 'nitropack/config'

export default defineNitroConfig({
  compatibilityDate: '2026-11-17',
  devServer: {
    watch: ['server'],
  },
  routeRules: {
    '/api/**': { cors: true, headers: { 'cache-control': 'no-store' } },
  },
})
