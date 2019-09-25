import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'
import store from '../vuex/store'

//声明使用vue插件

Vue.use(VueRouter)
const router = new VueRouter({
  mode: "history",
  routes
})

let paths=["/a","/b"]

router.beforeEach((to, from, next) => {
  if (paths.indexOf(to.path) !== -1 && !store.state.user.token) {
    next("/login")
  }else{
    next()
  }
})

export default router