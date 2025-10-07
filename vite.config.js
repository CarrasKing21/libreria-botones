import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/libreria-botones/',
  build: {
    // Genera archivos con hashes para invalidar la caché
    // Esto resuelve el problema de que los cambios no se reflejen
    outDir: 'dist',
    assetsDir: 'assets',
  }
})