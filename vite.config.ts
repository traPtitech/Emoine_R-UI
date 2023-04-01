import { defineConfig } from 'vite'
import VuePlugin from '@vitejs/plugin-vue'
import path from 'path'

const devHost = 'localhost:8090'
const prodHost = process.env.HOST

const srcPath = path.resolve(__dirname, 'src').replace(/\\/g, '/')

export default defineConfig({
  resolve: {
    alias: {
      '@': srcPath
    }
  },
  define: {
    __HOST__: `"${process.env.NODE_ENV === 'production' ? prodHost : devHost}"`
  },
  server: {
    proxy: {
      '/api': {
        target: `http://${devHost}`,
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "${srcPath}/styles/common.scss";`
      }
    }
  },
  plugins: [VuePlugin()]
})
