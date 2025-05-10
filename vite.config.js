import { defineConfig } from 'vite';

export default defineConfig({
  base: process.env.NODE_ENV === 'production' ? '/3d-portfolio/' : '',
  server: {
    port: 3000
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html'
      }
    }
  }
});
