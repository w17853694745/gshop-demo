import qs from 'qs'

export default (ajaxObj,axios)=>{

  return Object.keys(ajaxObj).reduce((pre,key)=>{
    let {url,method="GET",corsUrl="",isForm=false,checkToken=false} = ajaxObj[key]
      method = method.toUpperCase()
      if (corsUrl) {
        url = corsUrl+url
      }
    pre[key] = async (data={},config={})=>{
      let options
      let promise
      options = {url,method,headers:{checkToken}}
      if (method==="GET"||method==="DELETE") {
        options = Object.assign(options,{params:data},config)
      }else if (method==="POST"||method==="PUT") {
        if (isForm) {
          data = qs.stringify(data)
        }
        options = Object.assign(options,{data},config)
      }
      try {
        const result = await axios(options)   
        promise = Promise.resolve(result)
        config.onSuccess && config.onSuccess(result)
      } catch (error) {
        promise = Promise.reject(error)
        config.onEroor && config.onEroor(error)
      }
      return promise
    }
    return pre
  },{})
}