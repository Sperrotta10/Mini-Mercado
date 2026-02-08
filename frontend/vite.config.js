import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    vue(),
    command === 'serve' ? vueDevTools() : null,
  ].filter(Boolean),
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (!id.includes('node_modules')) return;

          if (id.includes('node_modules/vue/') || id.includes('node_modules/vue-router/') || id.includes('node_modules/pinia/')) {
            return 'vendor-vue';
          }

          if (
            id.includes('@vue/devtools-api') ||
            id.includes('@vue/devtools') ||
            id.includes('vue-devtools') ||
            id.includes('node_modules/hookable') ||
            id.includes('node_modules/birpc') ||
            id.includes('node_modules/perfect-debounce')
          ) {
            return 'vendor-vue';
          }

          if (id.includes('node_modules/vuetify/') || id.includes('node_modules/@mdi/')) {
            return 'vendor-vuetify';
          }

          if (id.includes('node_modules/jspdf')) {
            return 'vendor-pdf';
          }

          if (id.includes('node_modules/axios/')) {
            return 'vendor-axios';
          }

          if (id.includes('node_modules/sweetalert2/')) {
            return 'vendor-swal';
          }

          const pathPart = id.split('node_modules/')[1];
          if (!pathPart) return 'vendor';

          const segments = pathPart.split('/');
          const pkg = segments[0].startsWith('@') ? `${segments[0]}/${segments[1]}` : segments[0];
          return `vendor-${pkg.replace('@', '').replace('/', '-')}`;
        },
      },
    },
  },
}))
