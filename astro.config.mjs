import { defineConfig } from 'astro/config';

export default defineConfig({
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
