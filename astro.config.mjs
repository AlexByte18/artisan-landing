import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://artisaan.dev',
  integrations: [],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          // api: 'modern-compiler'
        }
      }
    }
  }
});
