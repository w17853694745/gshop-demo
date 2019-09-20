/* 
封装axios函数的模块
*/
import axios from 'axios'
import qs from 'qs'
/* 
instance除了缺少了一些axios的方法,其他都相同,都是Axios功能上的实例(语法上不是)
*/
const instance = axios.create({
  timeout:10000,
  baseURL:"/api"
})

//请求拦截器
instance.interceptors.request.use((config)=>{
  if (config.method.toUpperCase==="POST"&&config.data instanceof Object) {
    config.data = qs.stringify(config.data)
  }
  return config
})
//响应拦截器
instance.interceptors.response.use(
  response=>{
    return response.data
  },
  error=>{
    alert("error:"+error.message)
    return new Promise(()=>{})
  }
)
export default instance