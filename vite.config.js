import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/maple/', // 👉 레포지토리 이름으로
  plugins: [react()],
  server: {
    port: 5064, // ⭐ 원하는 포트 번호로 변경
  },
})
