import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:5000", // Flaskサーバーのアドレス
        changeOrigin: true,
        secure: false,
      },
      hmr: {
        protocol: 'ws',
        host: 'localhost', // 開発環境では localhost を指定
      },      
    },
  },
});
