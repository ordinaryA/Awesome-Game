import Vue from 'vue'
import Router from 'vue-router'

import Snack from '../page/snack'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'snack',
    component: Snack
  }]
})
