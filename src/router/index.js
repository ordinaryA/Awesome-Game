import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

import NotFound from "./404";
const empty = [{
  path: "*",
  redirect: "/404"
}];

const routes = [{
    path: '/',
    name: 'bird',
    component: resolve => require(['../page/bird'], resolve)
  },
  {
    path: '/snack',
    name: 'snack',
    component: resolve => require(['../page/snack'], resolve)
  },
  {
    path: '/sweep',
    name: 'sweep',
    component: resolve => require(['../page/sweep'], resolve)
  },
  ...NotFound,
  ...empty
]

export default new Router({
  routes
})
