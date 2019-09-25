// 对应shop的功能模块
import {
  RECEIVE_GOODS,
  RECEIVE_INFO,
  RECEIVE_RATINGS,
  ADD_COUNT,
  REDUCE_COUNT,
  CLEAR_ALL
} from '../mutation-type'
import {
  reqGoods,
  reqInfo,
  reqRatings
} from '../../api'
import {
  Toast
} from 'mint-ui'
import Vue from 'vue'


const state = {
  goods: [], // 商家
  ratings: [], // 评论
  info: {}, //商家详情
  shopCart:[] // 购物车
}
const mutations = {
  //设置goods
  [RECEIVE_GOODS](state, goods) {
    state.goods = goods
  },
  //设置ratings
  [RECEIVE_RATINGS](state, ratings) {
    state.ratings = ratings
  },
  //设置info
  [RECEIVE_INFO](state, info) {
    state.info = info
  },
  //添加count
  [ADD_COUNT](state,food){
    if (!food.count) {
      Vue.set(food,"count",1)
      state.shopCart.push(food)
    }else{
      food.count++
    }
  },
  //删除count
  [REDUCE_COUNT](state, food) {
    if (food.count>0) {
      food.count--
      if (food.count===0) {
        state.shopCart.splice(state.shopCart.indexOf(food), 1)
      }
    }
  },
  //清除所有count
  [CLEAR_ALL](state){
    state.shopCart.forEach(food=>{
      food.count = 0
    })
    state.shopCart = []
  }
}
const actions = {
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
  },
  // 增加count
  addCount({commit},food){
    commit(ADD_COUNT,food)
  },
  // 减少count
  reduceCount({commit},food){
    commit(REDUCE_COUNT, food)
  }
}
const getters = {
  //购物车所有的数量
  shopCartCount(state){
    return state.shopCart.reduce((pre,food)=>{
      pre+= food.count
      return pre
    },0)
  },
  //当前价格
  shopCartPrice(state) {
    return state.shopCart.reduce((pre, food) => {
      pre += food.count * food.price
      return pre
    }, 0)
  },
  //根据不同类型,返回不同的评论
  ratingsType: (state)=> (type) =>{
    if (type===0) {
      return state.ratings
    }else if (type===1) {
      let arr =[]
      state.ratings.forEach(rating=>{
        if (rating.score > 3) {
          arr.push(rating)
        }
      })
      return arr
    }else if (type===2){
      let arr = []
      state.ratings.forEach(rating => {
        if (rating.score <= 3) {
          arr.push(rating)
        }
      })
      return arr
    }
  }
  // //全部评论
  // allcontent(state) {
  //   return state.ratings
  // },
  // //好评
  // goodcontent(state){

  // }
}

export default {
  state,
  mutations,
  actions,
  getters
}