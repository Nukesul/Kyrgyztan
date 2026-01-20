import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Kyrgyztan/',   // 🔴 ЭТО БЫЛО ГЛАВНОЕ
  plugins: [react()],
})
