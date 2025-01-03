import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

import Components from 'unplugin-vue-components/vite'
import NutUIResolver from '@nutui/auto-import-resolver'

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      less: {
        // 在这里你可以配置一些 Less 的选项，比如：
        modifyVars: {
          // 例如修改 Ant Design 的主题色
          'primary-color': '#1DA57A'
        },
        javascriptEnabled: true // 启用 JavaScript 功能
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    Components({
      resolvers: [NutUIResolver()]
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
