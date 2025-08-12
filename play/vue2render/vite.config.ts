import path from 'node:path'
import process from 'node:process'
import { loadEnv } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'

// 封装环境变量
function wrapperEnv(env: Record<string, string>) {
  const result: Record<string, any> = {}
  Object.keys(env).forEach((key) => {
    let value = env[key]
    if (value === 'true') value = true
    if (value === 'false') value = false
    if (!isNaN(Number(value))) value = Number(value)
    result[key] = value
  })
  return result
}

export default ({ mode }: { mode: string }) => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)

  return {
    plugins: [createVuePlugin()],
    resolve: {
      alias: {
        'vue': path.resolve(__dirname, 'node_modules/vue/dist/vue.esm.js'),
        '@': path.resolve(__dirname, 'src')
      },
      modules: [path.resolve(__dirname, 'node_modules')]
    },
    build: {
      outDir: '../../dist/vue2render',
    },
    server: {
      port: viteEnv.VITE_PORT || 6099,
      open: true,
      cors: true,
      proxy: {
        '/api': {
          target: viteEnv.VITE_PROXY_URL || 'http://localhost:6060',
          secure: false,
          changeOrigin: true
        }
      }
    },
    logLevel: 'info'
  }
}
