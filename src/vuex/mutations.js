/* 
包含所有直接修改状态的方法的对象
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
export default {
  //设置地理位置
  [RECEIVE_ADDRESS](state,address){
    state.address = address
  },
  //设置商品分类
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  //设置商家列表
  [RECEIVE_SHOPS](state,shops){
    state.shops = shops
  },
  //保存user
  [RECEIVE_USER](state,user){
    state.user = user
  },
  //保存token
  [RECEIVE_TOKEN](state,token){
    state.token = token
  },
  //退出登录
  [LOG_OUT](state){
    state.user={},
    state.token=null
  },
  //设置goods
  [RECEIVE_GOODS](state,goods){
    state.goods = goods
  },
  //设置ratings
  [RECEIVE_RATINGS](state, ratings) {
    state.ratings = ratings
  },
  //设置info
  [RECEIVE_INFO](state, info) {
    state.info = info
  }
}