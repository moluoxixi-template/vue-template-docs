import createViteConfig from './src/components/ViteConfig/index.ts'
// import createViteConfig from './src/ViteConfig/es/index.mjs'

export default createViteConfig({
  rootPath: __dirname,
  mode: {
    base: {
      VITE_GLOB_APP_TITLE: 'vue-template',
      VITE_GLOB_APP_CODE: 'test',
      VITE_DEVTOOLS: false,
      VITE_PURE_CONSOLE_AND_DEBUGGER: false,
      VITE_PORT: 3300,
      VITE_OPEN: true,
      VITE_USE_QIANKUN: false,
      VITE_QIANKUN_DEV: false,
      VITE_SENTRY: false,
      VITE_REPORT: true,
      VITE_COMPRESS: true,
      VITE_IMAGEMIN: true,
      VITE_USE_CDN: true,
      VITE_USE_CDN_IS_DEV: false,
      VITE_CDN_BASE_URL: 'https://unpkg.com',
      VITE_BUILD_GZIP: false,
      VITE_DROP_CONSOLE: true,
    },
    development: {},
    production: {},
  },
  autoRoutes: {
    // 路由配置
    routeConfig: {
      views: ['/src/views/**/index.vue', '!/src/views/**/components/*'],
      examples: '/src/examples/**/index.vue',
      componentExamples: {
        glob: ['/src/components/**/Example.vue', '!/src/components/**/components/*'],
        baseRoute: {
          path: '/components',
          name: '组件示例',
        },
      },
    },
    // 可选: 指定.d.ts文件生成位置，true表示使用默认路径，false表示不生成
    dts: './src/typings/auto-routes.d.ts',
    // 可选: 项目根目录，通常不需要手动设置
    // root: __dirname,
    // 可选: 自定义虚拟模块ID
    // virtualModuleId: 'virtual:my-routes',
  },
})
