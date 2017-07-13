// 引用 vue
import Vue from 'vue'
// 引用 mint-ui
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
// 使用 mint-ui
Vue.use(Mint)
// 引用路由
import VueRouter from 'vue-router'
// 使用路由
Vue.use(VueRouter)
//引入jquery
import jquery from './config/jquery-1.8.0.min'
// 引用入口文件为 src/App.vue
import App from './App.vue'
// 引用路由配置文件
import routes from './config/routes'
// 引用API文件
import api from './config/api'
// 将API方法绑定到全局
Vue.prototype.$api = api
// 将接口地址绑定到全局
Vue.prototype.host = 'http://192.168.0.108:8888'
// 使用配置文件规则
const router = new VueRouter({
  routes
})
// 对Date的扩展 将 Date 转化为指定格式的String
Date.prototype.Format = function (fmt) {
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}
// 运行
new Vue({
  router,
  el: '#app',
  render: (h) => h(App)
})