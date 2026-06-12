import { defineConfig } from 'vite'

export default defineConfig({
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': 'http://localhost:3000'
    }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets'
  },
  test: {
    environment: 'jsdom',
    coverage: {
      provider: 'v8',
      include: [
        'src/js/cta-mode.js',
        'src/js/waitlist-form.js',
        'server/db/**',
        'server/routes/**'
      ],
      thresholds: { lines: 80 }
    }
  }
})
