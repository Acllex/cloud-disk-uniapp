import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import postcssPlugins from './postcss.config.js'
import { UnifiedViteWeappTailwindcssPlugin as uvwt } from 'weapp-tailwindcss/vite';

// https://vitejs.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }) => {
  const serverIp = command === 'serve' ? 'http://localhost:3000' : 'https://nest-cloud-be.vercel.app';
  return {
    plugins: [
      uni(),
      uvwt()
    ],
    css: {
      postcss: {
        plugins: postcssPlugins
      }
    },
    server: {
      proxy: {
        "/api": {
          target: serverIp,
          changeOrigin: true
        },
      },
    },
  }
})
