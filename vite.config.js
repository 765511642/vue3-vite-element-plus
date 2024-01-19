// import { fileURLToPath, URL } from 'node:url';
import cleanPlugin from 'vite-plugin-clean';  // 打包前清除dist文件
import removeConsole from "vite-plugin-remove-console"; // 生产去除console
import setupExtend from 'vite-plugin-vue-setup-extend'; // 设置组件name
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

// el按需加载
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';


import path from 'path';


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    cleanPlugin({
      targetFiles: ['dist']
    }),
    removeConsole(),
    setupExtend(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    })
  ],
  resolve: {
    alias: {
      // '@': fileURLToPath(new URL('./src', import.meta.url))
      '@': path.resolve(__dirname, 'src')
    },
    extensions: ['.vue', '.js'],
  },
  css: {
    preprocessorOptions: {
      scss: {
        // additionalData: `@use "@/styles/variables.scss" as *;`,
        // charset: false,
      }
    }
  },
  server: {
    host: 'localhost',
    port: '9090',
    proxy: {
      '/api': {
        target: '',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
});
