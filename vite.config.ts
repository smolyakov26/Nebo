import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import Sitemap from 'vite-plugin-sitemap'

export default defineConfig({
  base: '/',
  plugins: [
    vue(),
    tailwindcss(),
    Sitemap({
      hostname: 'https://nebo-kavkaz.ru',
      dynamicRoutes: ['/tandem', '/solo', '/sport', '/training', '/certificate', '/gallery'],
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      readable: true,
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
