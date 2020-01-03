// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.

import 'element-ui/lib/theme-chalk/index.css' //导入样式
import ElementUI from 'element-ui'


import Vue from 'vue'
import App from './App'
import router from './router'

Vue.use(ElementUI);

// 引用axios，并设置基础URL为后端服务api地址
var axios = require('axios');
axios.defaults.baseURL = 'http://www.csiqi.cn/csiqi/api';//服务器使用此地址
//axios.defaults.baseURL = 'http://127.0.0.1:8081/csiqi/api';//本地电脑使用此地址
//axios.defaults.baseURL = 'http://47.99.196.57/csiqi/api';
// `withCredentials` indicates whether or not cross-site Access-Control requests
// should be made using credentials  跨域携带cookie
axios.defaults.withCredentials = true;
axios.defaults.crossDomain=true
// 将API方法绑定到全局
Vue.prototype.$axios = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
