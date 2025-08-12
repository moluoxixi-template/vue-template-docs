import { Module } from 'vuex';

interface SystemState {
  loading: boolean;
  theme: 'light' | 'dark';
  language: string;
}

const system: Module<SystemState, any> = {
  namespaced: true,
  state: {
    loading: false,
    theme: 'light',
    language: 'zh'
  },
  mutations: {
    setLoading(state, payload: boolean) {
      state.loading = payload;
    },
    setTheme(state, payload: 'light' | 'dark') {
      state.theme = payload;
    },
    setLanguage(state, payload: string) {
      state.language = payload;
    }
  },
  actions: {
    toggleLoading({
      commit
    }, payload: boolean) {
      commit('setLoading', payload);
    },
    toggleTheme({
      commit
    }, payload: 'light' | 'dark') {
      commit('setTheme', payload);
    },
    changeLanguage({
      commit
    }, payload: string) {
      commit('setLanguage', payload);
    }
  },
  getters: {
    isLoading: (state) => state.loading,
    currentTheme: (state) => state.theme,
    currentLanguage: (state) => state.language
  }
};

export default system;
