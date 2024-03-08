import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  base: '',
  plugins: [react()],
  css: {
    include: ['./style.css'], // Füge hier den Pfad zu deiner style.css-Datei hinzu
  },
  build: {
    rollupOptions: {
      input: {
        main: './index.html',
        extFunc: './extFunc.js',
      },
    },
  },
});