import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
// import { VantResolver } from 'unplugin-vue-components/resolvers';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],

  // server: {
  //   proxy: {
  //     '/exhibition': {
  //       target: 'http://120.24.22.210:8098',
  //       changeOrigin: true,
  //       pathRewrite: { '^/exhibition': '' },
  //       secure: false, // 如果是https接口，需要配置这个参数为true
  //     }
  //   }
  // },


  // 别名配置
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    }
  }
})
