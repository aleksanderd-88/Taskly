import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import version from 'vite-plugin-package-version';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), version(), VitePWA({
    registerType: 'prompt',
    injectRegister: false,

    pwaAssets: {
      disabled: false,
      config: true,
    },

    manifest: {
      name: 'taskly',
      short_name: 'taskly',
      description: 'Frontend application',
      theme_color: '#ffffff',
    },

    workbox: {
      globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      cleanupOutdatedCaches: true,
      clientsClaim: true,
    },

    devOptions: {
      enabled: false,
      navigateFallback: 'index.html',
      suppressWarnings: true,
      type: 'module',
    },
  })],
  resolve: {
    alias: {
      '@': '/src'
    }
  },
})