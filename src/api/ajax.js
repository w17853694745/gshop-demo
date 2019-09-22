/* 
封装axios函数的模块
*/
import axios from 'axios'
import qs from 'qs'
import store from '../vuex/store'
import {Toast} from 'mint-ui'
import router from '../router'
/* 
instance除了缺少了一些axios的方法,其他都相同,都是Axios功能上的实例(语法上不是)
*/
const instance = axios.create({
  timeout:10000,
  baseURL:"/api"
})

//请求拦截器
instance.interceptors.request.use((config)=>{
  // 处理POST请求
  if (config.method.toUpperCase()==="POST"&&config.data instanceof Object) {
    config.data = qs.stringify(config.data)
  }
  // 处理携带token
  const token = store.state.token
  // console.log(store)
  if (config.headers.isneedToken) {
    if (token) {
      config.headers['Authorization'] = token
    }else{
      throw new Error("请先登录,才能继续浏览")
    }
  }
  return config
})
//响应拦截器
instance.interceptors.response.use(
  response=>{
    return response.data
  },
  error=>{
    if (!error.response) {
      if (router.currentRoute.path!=="/login") {
        //没有token
        Toast("需要登录才能访问")
        router.replace("/login")
      }
      
    } else{
      if (error.response.status==401) {
        if (router.currentRoute.path !== "/login") {
          //没有token
          Toast("账户信息已过期,请重新登录")
          router.replace("/login")
        }
      } else if (error.response.status == 404) {
        Toast("服务器资源加载错误")
      }
      alert("error:" + error.message)
      return new Promise(() => {})
    }
    
  }
)
export default instance