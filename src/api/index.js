/* 
包含n个接口函数
*/
import ajax from './ajax'

//根据经纬度获取位置详情
//longitude:经度
//latitude:纬度
export const reqAddress = (latitude, longitude) => ajax({
  method:"GET",
  url: `/position/${latitude},${longitude}`
})

//获取食品分类列表
export const reqCategorys = () => ajax.get("index_category",{
  headers:{
    checkToken: true
  }
})

//根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax.get("shops",{
  params:{
    latitude,
    longitude
  },
  headers: {
    checkToken: true
  }
})

// 发送短信验证码
export const reqSendCode = (phone) => ajax({
  url: "/sendcode",
  params:{
   phone
  }
})

// 手机号验证码登录
export const reqSmsLogin = ({phone,code}) => ajax({
  url: "/login_sms",
  method: "POST",
  data: {
    phone,
    code
  }
})

// 用户名密码登录
export const reqPwdLogin = ({
    name,
    pwd,
    captcha
  }) => ajax({
  url: "/login_pwd",
  method: "POST",
  data:{
    name,
    pwd,
    captcha
  }
})
// 自动登录
export const autoLogin = () => ajax("/auto_login", {
  // headers:{
  //   isneedToken:true
  // }
})
// 获取商品列表
export const reqGoods = ()=>ajax("/goods")
// 获取评论列表
export const reqRatings = () => ajax("/ratings")
// 获取商家信息
export const reqInfo = () => ajax("/info")
