import Mock from 'mockjs'
import data from './data.json'

// 商品列表 goods
Mock.mock("/api/goods", {code:0,data:data.goods})

// 评论 ratings
Mock.mock("/api/ratings", {code:0,data:data.ratings})

// 商家详情 info
Mock.mock("/api/info",{code:0,data:data.info})