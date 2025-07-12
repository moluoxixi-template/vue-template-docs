import createViteConfig from './src/components/ViteConfig/index.ts'

export default createViteConfig({
  rootPath: __dirname,
  mode: {
    base: {
      VITE_GLOB_APP_TITLE: 'vue-template',
      VITE_GLOB_APP_CODE: 'test',
      VITE_DEVTOOLS: 'false',
      VITE_PURE_CONSOLE_AND_DEBUGGER: 'false',
      VITE_PORT: '3300',
      VITE_OPEN: 'true',
      VITE_USE_QIANKUN: 'false',
      VITE_QIANKUN_DEV: 'false',
      VITE_SENTRY: 'false',
      VITE_REPORT: 'true',
      VITE_COMPRESS: 'true',
      VITE_IMAGEMIN: 'true',
      VITE_USE_CDN: 'true',
      VITE_USE_CDN_IS_DEV: 'false',
      VITE_CDN_BASE_URL: 'https://unpkg.com',
      VITE_BUILD_GZIP: 'false',
      VITE_DROP_CONSOLE: 'true',
    },
    development: {
      VITE_API_URL: '/api',
    },
    production: {
      VITE_API_URL: '',
    },
  },
})
