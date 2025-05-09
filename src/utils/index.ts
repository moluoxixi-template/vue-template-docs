interface modulesTypes {
  path: string
  name: string
  meta?: any
  component: () => Promise<unknown>
  children?: modulesTypes[]
}

function findParentRoute(modules: modulesTypes[], parentPath: string): modulesTypes | undefined {
  for (const route of modules) {
    if (route.path === parentPath) {
      return route
    }
    if (route.children) {
      const found = findParentRoute(route.children, parentPath)
      if (found) return found
    }
  }
  return undefined
}

export function getRoutes(files: any) {
  console.log('files', files)
  const modules: modulesTypes[] = []
  return Object.keys(files)
    .sort((a, b) => {
      const componentA = files[a]
      const aLength = componentA.__file.split('/').length
      const componentB = files[b]
      const bLength = componentB.__file.split('/').length
      return bLength > aLength ? -1 : 1
    })
    .reduce((modules = [], modulePath) => {
      const component = files[modulePath]
      const filePath = component.__file
      if (filePath.includes('components')) return modules
      const filePathArr = filePath.split('/')
      const startStrs = ['views', 'components', 'layout']
      const endStrs = ['index', 'index.vue']
      if (!component || modulePath == 'install') return modules

      const pathArr = filePathArr
        .reduce((path: string[], item: string) => {
          if ((startStrs.includes(item) || path.length) && !endStrs.includes(item)) {
            path.push(item)
          }
          return path
        }, [])
        .slice(1)
      const name = pathArr.at(-1)
      const path = `/${pathArr.join('/')}`
      const parentPath = `/${pathArr.slice(0, -1).join('/')}`

      const parentRoute = findParentRoute(modules, parentPath)
      if (parentRoute) {
        if (!parentRoute.children) parentRoute.children = []
        parentRoute.children.push({
          path,
          name: path,
          meta: {
            title: component.name || name,
          },
          component,
        })
      } else {
        modules.push({
          path,
          name: path,
          meta: {
            title: component.name || name,
          },
          component,
        })
      }
      return modules
    }, modules)
}

export function findDefaultRoute(routes: any[]): string {
  for (const route of routes) {
    if (route.meta?.default) {
      return route.path
    }
  }
  const route = routes[0]
  if (route.children?.length) {
    return findDefaultRoute(route.children)
  } else {
    return route.path
  }
}

/**
 * 深拷贝对象
 * @param obj 需要拷贝的对象
 * @param map WeakMap用于存储已经拷贝的对象，以便在遇到循环引用的情况时，直接返回缓存中的拷贝
 * @returns 拷贝后的对象
 */
export function cloneDeep(obj: any, map = new WeakMap()): any {
  if (typeof obj !== 'object' || obj === null) {
    // 如果不是对象，直接返回
    return obj
  }

  // 如果对象已经被拷贝过，直接返回缓存中的拷贝
  if (map.has(obj)) {
    return map.get(obj)
  }

  let clone: any

  // 判断是数组还是对象
  if (Array.isArray(obj)) {
    clone = []
    map.set(obj, clone)
    obj.forEach((item, index) => {
      // 递归拷贝数组中的每个元素
      clone[index] = cloneDeep(item, map)
    })
  } else {
    clone = {}
    map.set(obj, clone)
    for (const key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        // 递归拷贝对象中的每个属性
        clone[key] = cloneDeep(obj[key], map)
      }
    }
  }

  // 处理函数类型
  if (typeof obj === 'function') {
    // 将函数转换为字符串，并将其设置到拷贝对象中
    clone[typeof obj] = obj.toString()
  }

  return clone
}
