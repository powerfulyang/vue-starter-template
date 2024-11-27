import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import UnoCSS from 'unocss/vite'
import AutoImport from 'unplugin-auto-import/vite'
import imagemin from 'unplugin-imagemin/vite'
import Components from 'unplugin-vue-components/vite'
import VueMacros from 'unplugin-vue-macros/vite'
import { VueRouterAutoImports } from 'unplugin-vue-router'
import VueRouter from 'unplugin-vue-router/vite'
import { defineConfig } from 'vite'
import vueDevTools from 'vite-plugin-vue-devtools'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler', // 或 'modern'
      },
    },
  },
  server: {
    host: true,
  },
  plugins: [
    tsconfigPaths({
      projects: ['./tsconfig.app.json'],
      loose: true,
    }),
    VueMacros({
      plugins: {
        vue: vue(),
        vueJsx: vueJsx(),
        vueRouter: VueRouter({
          root: '.',
          // Add your own custom pages here. Just add it to the array. Example: 'src/welcome/pages'
          routesFolder: [
            {
              src: 'src/views',
              path: '/',
            },
          ],
          dts: 'src/auto-typings/typed-router.d.ts',
          extensions: ['.vue'],
          exclude: ['**/components/**'],
        }),
      },
    }),
    vueDevTools(),
    UnoCSS(),
    imagemin({}),
    Components({
      dirs: [
        'src/components',
      ],
      // directoryAsNamespace: true,
      dts: 'src/auto-typings/components.d.ts',
      resolvers: [
        // ...
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        VueRouterAutoImports,
        '@vueuse/core',
        'pinia',
      ],
      resolvers: [],
      dts: 'src/auto-typings/auto-imports.d.ts',
      dirs: [
        'src/hooks',
      ],
    }),
  ],
})
