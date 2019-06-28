import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/',
      name: 'snack',
      component: resolve => require(['../page/snack/index'], resolve)
    },
    {
      path: '/sweep',
      name: 'sweep',
      component: resolve => require(['../page/sweep/index'], resolve)
    },
  ]
})
