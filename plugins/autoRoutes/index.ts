// autoRoutes/index.ts
import type { Plugin } from 'vite'

interface RouteModule {
  path: string
  name: string
  meta?: any
  component?: () => Promise<any>
  children?: RouteModule[]
}

interface objRouteConfig {
  glob: string | string[]
  baseRoute?: RouteModule
}

interface RouteConfig {
  [prefix: string]: string | string[] | objRouteConfig
}

interface config {
  routeConfig: RouteConfig
  virtualModuleId?: string
}

function createAutoRoutesPlugin({ routeConfig, virtualModuleId }: config): Plugin {
  const moduleCache = new Map()
  const VIRTUAL_MODULE_ID = virtualModuleId || 'virtual:auto-routes'
  const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID
  return {
    name: 'vite-plugin-auto-routes',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const imports: string[] = []
        const routes: string[] = []

        Object.entries(routeConfig).forEach(([prefix, globVal], index) => {
          const varName = `files${index}`
          const glob: string | string[] =
            (globVal as objRouteConfig).glob || (globVal as string | string[])
          imports.push(
            `const ${varName} = import.meta.glob(${JSON.stringify(glob)}, { eager: true, import: 'default' });`,
          )
          const baseRoute: RouteModule = (globVal as objRouteConfig).baseRoute!
          routes.push(`...generateRoutes(${varName}, '${prefix}',${JSON.stringify(baseRoute)})`)
        })

        // 生成路由JS代码
        const code = `
          ${imports.join('\n')}

          function findParentRoute(modules, parentPath) {
            for (const route of modules) {
              if (route.path === parentPath) {
                return route;
              }
              if (route.children) {
                const found = findParentRoute(route.children, parentPath);
                if (found) return found;
              }
            }
            return undefined;
          }

          function generateRoutes(files, prefix = '' ,baseRoute) {
            if(baseRoute){
              baseRoute.children = baseRoute.children || [];
              baseRoute.name = baseRoute.name || prefix;
            }
            const modules = baseRoute ? [baseRoute] : [];
            return Object.keys(files)
              .sort((a, b) => {
                const aLength = a.split('/').length;
                const bLength = b.split('/').length;
                return bLength > aLength ? -1 : 1;
              })
              .reduce((modules = [], modulePath) => {
                const component = files[modulePath];
                if (!component || modulePath === 'install') return modules;

                const filePathArr = modulePath.split('/');
                const srcIndex = filePathArr.findIndex(part => part === 'src');
                if (srcIndex === -1) return modules;

                // 从src后面一位到倒数第二位作为path
                const pathArr = filePathArr.slice(srcIndex + 1, -1);
                console.log('pathArr', pathArr);
                const name = component.name || pathArr.at(-1);
                const path = \`/\${pathArr.join('/')}\`;
                const parentPath = \`/\${pathArr.slice(0, -1).join('/')}\`;

                const parentRoute = findParentRoute(modules, parentPath);
                console.log('parentPath', parentPath,path, parentRoute);
                if (parentRoute) {
                  if (!parentRoute.children) parentRoute.children = [];
                  parentRoute.children.push({
                    path,
                    name: path,
                    meta: {
                      title: component.name || name,
                    },
                    component,
                  });
                } else {
                  modules.push({
                    path,
                    name: path,
                    meta: {
                      title: component.name || name,
                    },
                    component,
                  });
                }
                return modules;
              }, modules);
          }

          const routes = [${routes.join(',\n')}];
          export default routes;
        `

        moduleCache.set(id, code)
        return code
      }
    },
  }
}

export default createAutoRoutesPlugin
