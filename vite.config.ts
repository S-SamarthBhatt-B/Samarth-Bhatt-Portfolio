import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'node:path';

// NOTE: base must match your GitHub repo name exactly (case-sensitive),
// since GitHub Pages serves project sites at username.github.io/<repo-name>/.
// Assumed repo name: "Samarth-Bhatt-Portfolio" — update below if you name it differently.
export default defineConfig({
  base: '/Samarth-Bhatt-Portfolio/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
});
