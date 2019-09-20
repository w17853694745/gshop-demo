/* 
包含所有直接修改状态的方法的对象
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
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
  }
}