// 引入子路由
import Frame from '../frame/subroute.vue'
//引入登录页
import login from '../components/login.vue'
// 引用模板
import home from '../components/home.vue'

// 配置路由
export default [
  {
    path: '/',
    component: login
  },
  {
    path: '/home',
    component: home
  }
  //子路由调用
  // {
  //   path: '/user',
  //   component: Frame,
  //   children: [
  //     {path: '/',component: userIndex}
  //   ],
  // }
]