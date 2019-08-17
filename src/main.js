import Vue from 'vue';
import Buefy from 'buefy';
import VeeValidate from 'vee-validate';
import App from './App.vue';
import Directives from './directives';

import 'buefy/dist/buefy.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

Vue.config.productionTip = false;

Vue.use(Buefy);
Vue.use(VeeValidate);

Directives.init();

new Vue({
  render: h => h(App),
}).$mount('#app');
