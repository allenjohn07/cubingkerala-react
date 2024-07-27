// vite.config.js
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // This allows access from any IP address
    port: 5173, // You can specify a different port if needed
  },
});
