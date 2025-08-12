import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueCompositionAPI from '@vue/composition-api';
import store from './store';
import router from './router';
import App from './App.vue';
// import layouts from './layout';

Vue.use(ElementUI);
Vue.use(VueCompositionAPI);
// Vue.use(layouts);

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
});
