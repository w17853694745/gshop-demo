import Vue from 'vue'
import App from './App.vue'
// import VeeValidate from 'vee-validate'
// import zh_CN from 'vee-validate/dist/locale/zh_CN'
import {
  Button
} from 'mint-ui'

import './mock/mockApi'
import './common/vee-validate/vee-validate'
import router from './router'
import Header from './components/Header/Header.vue'
import store from './vuex/store'
import Start from './components/Start/Start.vue'

// Vue.use(VeeValidate)

Vue.config.productionTip = false
Vue.component("Header",Header)
Vue.component("Start", Start)
Vue.component(Button.name,Button)

// VeeValidate.Validator.localize('zh_CN', {
//   messages: zh_CN.messages,
//   attributes: {
//     phone: '手机号',
//     code: '验证码',
//     name: '账号或邮箱',
//     pwd:"密码",
//     captcha: "验证码"

//   }
// })

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
