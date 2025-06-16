import path from 'path'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { visualizer } from 'rollup-plugin-visualizer'
import viteCompression from 'vite-plugin-compression'
import viteImagemin from 'vite-plugin-imagemin'
import { createHtmlPlugin } from 'vite-plugin-html'
import autoprefixer from 'autoprefixer'
import tailwindcss from '@tailwindcss/postcss'
import qiankun from 'vite-plugin-qiankun'
import type { Plugin } from 'postcss'
import scopedCssPrefixPlugin from './plugins/addScopedAndReplacePrefix'
import { sentryVitePlugin } from '@sentry/vite-plugin'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vueDevTools from 'vite-plugin-vue-devtools'
import cdn from 'vite-plugin-cdn-import'

function getCamelCase(str: string): string {
  return str
    .replace(/[-_]+/g, ' ') // 将连字符或下划线替换为空格
    .replace(/(?:^|\s)\w/g, (match) => match.toUpperCase()) // 每个单词首字母大写
    .replace(/\s+/g, '') // 移除所有空格
}

interface CdnModule {
  name: string
  var?: string
  css?: string
  path?: string
  alias?: string
}

function getCdnModules(modules: Array<string | CdnModule>): any {
  function getPath(str: string | undefined) {
    if (!str) return ''
    return str.startsWith('/') ? str : `/${str}`
  }

  return modules
    .map((item) => {
      if (typeof item === 'string') {
        return {
          name: item,
          var: getCamelCase(item),
          path: '',
        }
      } else {
        return item
      }
    })
    .map((item) => {
      return {
        name: item.name,
        var: item.var || getCamelCase(item.name),
        path: getPath(item.path),
        css: getPath(item.css),
      }
    })
}

/**
 * 将环境变量中的字符串值转换为对应的 JavaScript 数据类型
 */
function wrapperEnv(env: Record<string, string>) {
  const result: Record<string, any> = {}

  for (const key in env) {
    if (Object.prototype.hasOwnProperty.call(env, key)) {
      const value = env[key].trim()

      // 处理布尔值
      if (value === 'true' || value === 'false') {
        result[key] = value === 'true'
      }
      // 处理数值
      else if (!isNaN(Number(value))) {
        result[key] = Number(value)
      }
      // 处理空字符串
      else if (value === '') {
        result[key] = null
      }
      // 其他情况保留原始字符串
      else {
        result[key] = value
      }
    }
  }

  return result
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const systemCode = viteEnv.VITE_GLOB_APP_CODE
  const appTitle = viteEnv.VITE_GLOB_APP_TITLE
  const isDev = mode === 'development'

  const vuePlugins = [
    vue(),
    qiankun(systemCode, { useDevMode: false }),
    scopedCssPrefixPlugin({
      prefixScoped: `div[data-qiankun='${systemCode}']`,
      oldPrefix: 'el',
      newPrefix: systemCode,
    }),
    vueJsx(),
    isDev && vueDevTools(),
  ].filter((i) => !!i)
  const modules = getCdnModules([
    'vue',
    'vue-router',
    {
      name: 'lodash',
      var: '_',
    },
    {
      name: 'element-plus',
      css: 'dist/index.css',
    },
    {
      name: '@element-plus/icons-vue',
      var: 'ElementPlusIconsVue',
    },
  ])
  const performancePlugins = [
    createHtmlPlugin({
      inject: {
        data: {
          title: appTitle,
        },
      },
    }),
    // 代码压缩
    viteEnv.VITE_COMPRESS &&
      viteCompression({
        algorithm: viteEnv.VITE_BUILD_GZIP ? 'gzip' : 'brotliCompress',
        verbose: true,
        disable: false,
        ext: '.gz',
        threshold: 10240,
        deleteOriginFile: false,
      }),
    // 图片压缩
    viteEnv.VITE_IMAGEMIN &&
      viteImagemin({
        gifsicle: { optimizationLevel: 7, interlaced: false },
        optipng: { optimizationLevel: 7 },
        mozjpeg: { quality: 20 },
        pngquant: { quality: [0.8, 0.9], speed: 4 },
        svgo: {
          plugins: [{ name: 'removeViewBox' }, { name: 'removeEmptyAttrs', active: false }],
        },
      }),
    viteEnv.VITE_USE_CDN &&
      cdn({
        enableInDevMode: viteEnv.VITE_USE_CDN_IS_DEV,
        prodUrl: `${viteEnv.VITE_CDN_BASE_URL}/{name}@{version}{path}`,
        modules,
      }),
  ].filter((i) => !!i)

  const monitorPlugins = [
    viteEnv.VITE_SENTRY &&
      sentryVitePlugin({
        authToken: process.env.SENTRY_AUTH_TOKEN,
        org: 'f1f562b9b82f',
        project: 'javascript-vue',
      }),
    // 是否生成包预览
    viteEnv.VITE_REPORT &&
      visualizer({
        open: true,
      }),
  ].filter((i) => !!i)

  return {
    base: `/${systemCode}`,
    plugins: [...vuePlugins, ...performancePlugins, ...monitorPlugins],
    esbuild: {
      pure:
        !isDev && viteEnv.VITE_PURE_CONSOLE_AND_DEBUGGER
          ? ['console.log', 'console.info', 'console.debug']
          : [],
    },
    // 预构建相关
    optimizeDeps: {
      include: [],
      exclude: [],
    },
    build: {
      sourcemap: isDev,
      outDir: `${systemCode}`,
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1500,
      minify: 'esbuild',
      rollupOptions: {
        external: [],
        output: {
          globals: {},
          chunkFileNames: 'static/js/[name]-[hash].js',
          entryFileNames: 'static/js/[name]-[hash].js',
          assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
          manualChunks: (id: string) => {
            // 优化拆分策略
            if (id.includes('node_modules')) {
              const moduleName = id.toString().split('node_modules/')[1].split('/')[0].toString()

              if (
                ['vue', 'vue-router', 'vue-demi', '@vue'].some((item) => moduleName.includes(item))
              ) {
                return 'vue-vendor'
              }
              if (['element-plus', '@element-plus'].some((item) => moduleName.includes(item))) {
                return 'element-vendor'
              }
              return 'vendor-' + moduleName
            }

            if (id.includes('src/components/')) {
              return 'components'
            }

            if (id.includes('src/utils/')) {
              return 'utils'
            }
          },
        },
      },
    },
    define: {
      __SYSTEM_CODE__: JSON.stringify(systemCode),
    },
    css: {
      postcss: {
        plugins: [tailwindcss() as Plugin, autoprefixer() as Plugin],
      },
      devSourcemap: isDev,
      preprocessorOptions: {
        scss: {
          api: 'modern-compiler',
          additionalData(content: string, filename: string) {
            if (filename.includes('element\\index.scss')) {
              const addStr = `$namespace: ${systemCode};`
              return `${addStr}\n${content}`
            }
            return content
          },
        },
      },
    },
    resolve: {
      extensions: ['.js', '.jsx', '.ts', '.tsx', '.vue'],
      alias: {
        '@': path.resolve(__dirname, './src'),
      },
    },
    server: {
      host: '0.0.0.0',
      port: viteEnv.VITE_PORT,
      open: viteEnv.VITE_OPEN,
      cors: true,
      proxy: {},
    },
  }
})
