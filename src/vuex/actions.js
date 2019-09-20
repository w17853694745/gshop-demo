/* 
包含所有间接修改状态的方法的函数
*/
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS
} from './mutation-type'
import {reqAddress,reqCategorys,reqShops} from '../api'
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
    if (result.code === 0 ) {
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
  }
}