import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'
import Shop from '../pages/Shop/Shop.vue'
import ShopGoods from '../pages/Shop/ShopGoods.vue'
import ShopRatings from '../pages/Shop/ShopRatings.vue'
import ShopInfo from '../pages/Shop/ShopInfo.vue'
import Details from '../pages/Details/Details.vue'

export default [{
    path: "/msite",
    component: Msite,
    meta:{
      isFooterShow:true
    }
  },
  {
    path: "/search",
    component: Search,
    meta: {
      isFooterShow: true
    }
  },
  {
    path: "/order",
    component: Order,
    meta: {
      isFooterShow: true
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      isFooterShow: true
    }
  },
  {
    path: "/login",
    component: Login
  },
  {
    path: "/shop",
    component: Shop,
    children:[
      {
        path:"/shop/goods",
        component: ShopGoods
      },
      {
        path:"ratings",
        component:ShopRatings
      },
      {
        path:"info",
        component:ShopInfo
      },
      {
        path:"",
        redirect:"/shop/goods"
      }
    ]
  },
  {
    path:"/details",
    component: Details
  },
  {
    path: "/",
    redirect: "/msite"
  },
]