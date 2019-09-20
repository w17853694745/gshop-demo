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
export const reqCategorys = () => ajax.get("index_category")

//根据经纬度获取商铺列表
export const reqShops = ({latitude, longitude}) => ajax.get("shops",{
  params:{
    latitude,
    longitude
  }
})