import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Change 'changelog-widget' to match your GitHub repo name if different
export default defineConfig({
  plugins: [react()],
  base: '/changelog-widget/',
})
