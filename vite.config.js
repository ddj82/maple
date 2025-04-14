/* eslint-env node */
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig(({ mode }) => {
  // eslint-disable-next-line no-undef
  const env = loadEnv(mode, process.cwd())

  return {
    base: env.VITE_BASE_URL || '/', // ✅ undefined 방지
    plugins: [react()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      port: 5064, // ⭐ 원하는 포트 번호로 변경
    },
  }
})
