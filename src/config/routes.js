// 引入子路由
import Frame from '../frame/subroute.vue'
//引入登录页
import login from '../components/login.vue'
// 引用主页面
import home from '../components/home.vue'
// 引用系统设置子页面
import system from '../components/system/system.vue'
import wifi from '../components/system/wifi.vue'
//引入考勤子页面
import clock from '../components/clock/clock.vue'
import clockTotal from '../components/clock/clockTotal.vue'
import clockTotalExplain from '../components/clock/clockTotalExplain.vue'
//引入考勤子页面
import workLog from '../components/logManage/workLog.vue'
import myLog from '../components/logManage/myLog.vue'
import editLog from '../components/logManage/editLog.vue'
import writeLog from '../components/logManage/writeLog.vue'


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
  // 系统设置
  {
    path: '/system',
    component: Frame,
    children: [
      {
        path: '/',
        component: system
      },
      {
        path: '/wifi',
        component: wifi
      }
    ]
   
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
  },
   //工作日志路由调用
  {
    path: '/logManage',
    component: Frame,
    children: [
      {
        path: '/workLog',
        component: workLog
      },
      {
        path: '/myLog',
        component: myLog
      },
      {
        path: '/editLog',
        component: editLog
      },
      {
        path: '/writeLog',
        component: writeLog
      }
    ]
  }
]