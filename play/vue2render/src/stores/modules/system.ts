/**
 * 系统store模块
 */
const system = {
  namespaced: true,
  state: {
    /**
     * 主题颜色
     * @type {string}
     */
    themeColor: '#3a77ff',
    /**
     * 布局
     * @type {string}
     */
    layout: 'element',
    /**
     * 系统编码
     * @type {string}
     */
    systemCode: __SYSTEM_CODE__,
  },
  mutations: {
    SET_SYSTEM_CODE(state: any, systemCode: string) {
      state.systemCode = systemCode
    },
    SET_LAYOUT(state: any, layout: string) {
      state.layout = layout
    },
    SET_THEME(state: any, color: string) {
      state.themeColor = color
    },
  },
  actions: {
    setSystemCode({ commit }: any, systemCode: string) {
      commit('SET_SYSTEM_CODE', systemCode)
    },
    /**
     * 设置布局
     * @param {string} layout - 新的布局
     */
    setLayout({ commit }: any, layout: string) {
      commit('SET_LAYOUT', layout)
    },
    /**
     * 设置主题颜色
     * @param {string} color - 新的主题颜色
     */
    setTheme({ commit }: any, color: string) {
      commit('SET_THEME', color)
    },
  },
}

export default system
