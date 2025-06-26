declare module 'virtual:auto-routes' {
  interface RouteModule {
    path: string
    name: string
    meta?: any
    component: () => Promise<any>
    children?: RouteModule[]
  }

  const routes: RouteModule[]
  export default routes
}
