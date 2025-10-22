import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
// import fs from 'fs';
// import path from 'path';
// Đường dẫn đến certificate và key
// const keyPath = path.resolve(__dirname, 'key.pem');
// const certPath = path.resolve(__dirname, 'cert.pem');
// https://vite.dev/config/
export default defineConfig({
  base: '/project-mini/',   // <--- thêm dòng này
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc', // 👈 alias để MUI dùng styled-components
    },
  },
  server: {

    // https: {
    //   key: fs.readFileSync(keyPath),
    //   cert: fs.readFileSync(certPath),
    // },
    proxy: {
      '/api': {
        target: 'https://localhost:7140',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    port: 5173,

  }
})
