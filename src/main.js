import Vue from 'vue';
import App from '@/App.vue';
import router from '@/router';
import store from '@/store';
import VueMask from 'v-mask';
import VueModalTor from 'vue-modaltor';

Vue.use(VueModalTor, {
  bgPanel: '#fff',
  bgOverlay: 'rgba(0,0,0,.40)',
  closeScroll: false,
});

Vue.use(VueMask);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
