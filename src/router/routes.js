import Msite from '../pages/Msite/Msite.vue'
import Search from '../pages/Search/Search.vue'
import Order from '../pages/Order/Order.vue'
import Profile from '../pages/Profile/Profile.vue'
import Login from '../pages/Login/Login.vue'

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
    path: "/",
    redirect: "/msite"
  },
  {
    path: "/login",
    component: Login
  }
]