import Vue from 'vue'
import App from './App.vue'

import router from './router'
import Header from './components/Header/Header.vue'
import store from './vuex/store'
import Start from './components/Start/Start.vue'

Vue.config.productionTip = false
Vue.component("Header",Header)
Vue.component("Start", Start)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
