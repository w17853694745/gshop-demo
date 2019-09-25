// 对应msite的功能模块
import {
  RECEIVE_ADDRESS,
  RECEIVE_CATEGORYS,
  RECEIVE_SHOPS,
} from '../mutation-type'
import {
  reqAddress,
  reqCategorys,
  reqShops
} from '../../api'
import Api2 from '../../api2'


const state = {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], // 商家数组
}
const mutations = {
  //设置地理位置
  [RECEIVE_ADDRESS](state, address) {
    state.address = address
  },
  //设置商品分类
  [RECEIVE_CATEGORYS](state, categorys) {
    state.categorys = categorys
  },
  //设置商家列表
  [RECEIVE_SHOPS](state, shops) {
    state.shops = shops
  },
}
const actions = {
  // 通知更新address:定位
  async getAddress({commit,state}){
    //获取地理位置
    const {latitude, longitude} = state
    const result = await Api2.msite.getAddress({latitude, longitude})
    if (result.code === 0) {
      commit(RECEIVE_ADDRESS, result.data)
    }
    //通知更新
  },
  // 通知更新categorys:分类列表
  async getCategorys({commit}){
    const result = await Api2.msite.getCategorys()
    if (result.code === 0) {
      commit(RECEIVE_CATEGORYS,result.data)
    }
  },
  // 通知更新shops:商家列表
  async getshops({commit,state}) {
    const {latitude, longitude} = state
    const result = await Api2.msite.getShops({
      latitude,
      longitude
    })
    if (result.code === 0) {
      commit(RECEIVE_SHOPS, result.data)
    }
  },
}
const getters = {}

export default {
  state,
  mutations,
  actions,
  getters
}