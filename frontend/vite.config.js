import { defineConfig } from 'vite';
import dotenv from 'dotenv';
 
// 加载 .env 文件
dotenv.config();
 
console.log('VITE_PORT:', process.env.VITE_PORT); // 调试输出
 
export default defineConfig({
  server: {
    host: 'localhost',
    port: parseInt(process.env.VITE_PORT) || 5173,
    strictPort: true,
  },
});