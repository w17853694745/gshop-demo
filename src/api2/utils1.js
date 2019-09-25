/* 
自动生成接口请求函数的模块
*/
import qs from 'qs'
export default (ajaxObj,axios)=>{

  //返回一个包含所有请求函数的对象
  return Object.keys(ajaxObj).reduce((pre,key)=>{
    let {url, method= "GET", isForm= false, checkToken= false, corsUrl=''} = ajaxObj[key]
    method = method.toUpperCase()
    if (corsUrl) {
      url = corsUrl+url
    }
    //根据属性名生成同名函数
    pre[key] = async (data={},config={})=>{
      let promise
      let options = {url,method,headers:{checkToken}}
      if (method==="GET"||method==="DELETE") {
        options = Object.assign(options,{params:data},config)
      } else if (method === "POST" || method === "PUT") {
        if (isForm) {
          data = qs.stringify(data)
        }
        options = Object.assign(options, {data}, config)
      }
      try {
        const result = await axios(options)
        config.onSuccess && config.onSuccess(result)
        promise = Promise.resolve(result)
      } catch (error) {
        config.onError && config.onError(error)
        promise = Promise.reject(error)
      }

      return promise
    }
    return pre
  },{})

}