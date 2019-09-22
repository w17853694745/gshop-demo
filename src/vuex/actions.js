/* 
包含所有间接修改状态的方法的函数
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
  RECEIVE_USER,
  RECEIVE_TOKEN,
  LOG_OUT,
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS
} from './mutation-type'
import {reqAddress,reqCategorys,reqShops,autoLogin,reqGoods,reqInfo,reqRatings} from '../api'
import {Toast} from 'mint-ui'
export default {
  // 通知更新address:定位
  async getAddress({commit,state}){
    //获取地理位置
    const {latitude, longitude} = state
    const result = await reqAddress(latitude, longitude)
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, result.data)
    }
    //通知更新
  },
  // 通知更新categorys:分类列表
  async getCategorys({commit}){
    const result = await reqCategorys()
    if (result.code === 0) {
      commit(RECEIVE_CATEGORYS,result.data)
    }
  },
  // 通知更新shops:商家列表
  async getshops({commit,state}) {
    const {latitude, longitude} = state
    const result = await reqShops({latitude, longitude})
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, result.data)
    }
  },
  //保存user和token
  saveUser({commit},user){
    commit(RECEIVE_USER,user)
    commit(RECEIVE_TOKEN, user.token)
  },
  //自动登录
  async auto_Login({commit}){
    const result = await autoLogin()
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
  //保存商品列表goods
  async savegoods({commit}){
    const result = await reqGoods()
    if (result.code === 0) {
      commit(RECEIVE_GOODS,result.data)
    }else{
      Toast("获取商品列表失败")
    }
  },
  //保存评论列表ratings
  async saveratings({commit}){
    const result = await reqRatings()
    if (result.code === 0) {
      commit(RECEIVE_RATINGS,result.data)
    }else{
      Toast("获取评论列表失败")
    }
  },
  //保存评论列表info
  async saveinfo({commit}){
    const result = await reqInfo()
    if (result.code === 0) {
      commit(RECEIVE_INFO,result.data)
    }else{
      Toast("获取商家信息失败")
    }
  }
}