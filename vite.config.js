import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import postcssPlugins from './postcss.config.js'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';
import { WeappTailwindcssDisabled } from './platform'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    uni(),
    uvwt({ rem2rpx: true, disabled: WeappTailwindcssDisabled })
  ],
  css: {
    postcss: {
      plugins: postcssPlugins
    }
  },
  server: {
    proxy: {
      "/api": {
        target: "http://127.0.0.1:3000",
        changeOrigin: true,
      },
    },
  },
})
