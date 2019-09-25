// 对应user的功能模块

import {
  RECEIVE_USER,
  RECEIVE_TOKEN,
  LOG_OUT,
} from '../mutation-type'
// import {
//   autoLogin
// } from '../../api'
import Api2 from '../../api2'

const state = {
  user: {}, // 用户
  token: localStorage.getItem("token_id"), // 用户的token
}
const mutations = {
  //保存user
  [RECEIVE_USER](state, user) {
    state.user = user
  },
  //保存token
  [RECEIVE_TOKEN](state, token) {
    state.token = token
  },
  //退出登录
  [LOG_OUT](state) {
    state.user = {},
      state.token = null
  },
}
const actions = {
  //保存user和token
  saveUser({commit},user){
    commit(RECEIVE_USER,user)
    commit(RECEIVE_TOKEN, user.token)
  },
  //自动登录
  async auto_Login({commit}){
    const result = await Api2.user.autoLogin()
    if (result && result.code === 0) {
      commit(RECEIVE_USER,result.data)
    }
  },
  //退出登录
  logOut({commit}){
    //清除local
    localStorage.removeItem("token_id")
    //清除state的信息
    commit(LOG_OUT)
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}