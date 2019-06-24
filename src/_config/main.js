// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from '../App'
import router from '../router'
import store from "@/store";

import {
  Install_Function,
  Install_Command
} from "./build";

Install_Function(Vue); //this绑定方法
Install_Command(Vue); //自定义指令

/* eslint-disable no-new */
const _Vue = new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})

export default _Vue;
