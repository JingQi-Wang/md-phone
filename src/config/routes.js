// 引入子路由
import Frame from '../frame/subroute.vue'
//引入登录页
import login from '../components/login.vue'
// 引用模板
import home from '../components/home.vue'
//引入考勤子页面
import clock from '../components/clock/clock.vue'
import clockTotal from '../components/clock/clockTotal.vue'
import clockTotalExplain from '../components/clock/clockTotalExplain.vue'

// 配置路由
export default [
  {
    path: '/',
    component: login
  },
  {
    path: '/home',
    component: home
  },
  //考勤路由调用
  {
    path: '/clock',
    component: Frame,
    children: [
      {
        path: '/',
        component: clock
      },
      {
        path: '/clockTotal',
        component: clockTotal
      },
      {
        path: '/clockTotalExplain',
        component: clockTotalExplain
      }
    ]
  }
]