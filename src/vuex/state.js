/* 
包含所有状态属性的对象
*/
export default {
  latitude: 40.10038, // 纬度
  longitude: 116.36867, // 经度
  address: {}, // 地址信息对象
  categorys: [], // 分类数组
  shops: [], // 商家数组
  user:{}, // 用户
  token:localStorage.getItem("token_id"), // 用户的token
  goods:[], // 商家
  ratings:[], // 评论
  info:{}, //商家详情
}