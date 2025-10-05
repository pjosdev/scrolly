import { defineConfig } from 'tsdown';

export default defineConfig({
  entry: ['index.ts'], // Changed from scrolly.tsx
  format: ['cjs', 'esm'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom'],
});