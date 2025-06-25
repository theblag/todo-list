import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/todolist/', // 👈 change this to match your GitHub repo name
  plugins: [react()],
})
