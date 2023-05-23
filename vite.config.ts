import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // server: {
  //   headers: {
  //     'Access-Control-Allow-Origin': '*',
  //     'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  //     'Access-Control-Allow-Headers': '*',
  //   },
  //   cors: {
  //     origin: '*',
  //     methods: 'GET, POST, PUT, DELETE, OPTIONS',
  //     allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept, Authorization',
  //   },
  // }
})
