import Vue from 'vue'
import App from './App.vue'
import {
  Button
} from 'mint-ui'

import './mock/mockApi'
import './common/vee-validate/vee-validate'
import router from './router'
import Header from './components/Header/Header.vue'
import CartControl from './components/CartControl/CartControl.vue'
import store from './vuex/store'
import Start from './components/Start/Start.vue'
import i18n from './i18n'
import VueLazyload from 'vue-lazyload'
import loading from './common/images/loading.gif'
import Api2 from './api2'

Vue.prototype.$Api2 = Api2

Vue.use(VueLazyload,{
  loading
})

Vue.config.productionTip = false
Vue.component("Header",Header)
Vue.component("Start", Start)
Vue.component("CartControl", CartControl)
Vue.component(Button.name,Button)

new Vue({
  // render: h => h(App),
  components:{
    App
  },
  template:"<App/>",
  router,
  i18n,
  store
}).$mount('#app')
