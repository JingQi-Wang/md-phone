// 引用 vue
import Vue from 'vue'

// 引用入口文件为 src/App.vue
import App from './App.vue'

// 引用 mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// 使用 mint-ui
Vue.use(Mint)


// 引用路由
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)
// 引用路由配置文件
import routes from './config/routes'
// 使用配置文件规则
const router = new VueRouter({
  routes
})

//引入jquery
import jquery from './config/jquery-1.8.0.min'

// 引用index.js文件
import index from './config/index'
// 将index中的方法绑定到全局
Vue.prototype.$index = index

// 引用API文件
import api from './config/api'
// 将API方法绑定到全局
Vue.prototype.$api = api

// 为全局设置一个全局的用户对象
Vue.prototype.$user = new Object()

// 运行
new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
})