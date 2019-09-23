import Vue from 'vue'
import App from './App.vue'
import {
  Button
} from 'mint-ui'

import './mock/mockApi'
import './common/vee-validate/vee-validate'
import router from './router'
import Header from './components/Header/Header.vue'
import store from './vuex/store'
import Start from './components/Start/Start.vue'
import i18n from './i18n'

Vue.config.productionTip = false
Vue.component("Header",Header)
Vue.component("Start", Start)
Vue.component(Button.name,Button)

new Vue({
  render: h => h(App),
  router,
  i18n,
  store
}).$mount('#app')
