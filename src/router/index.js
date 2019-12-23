import Vue from 'vue';
import Router from 'vue-router';

import NotFound from "./404";
Vue.use(Router);
const empty = [{
  path: "*",
  redirect: "/404"
}];

const routes = [
  {
    path: '/',
    name: 'bird',
    component: resolve => require(['../page/bird'], resolve)
  },
  {
    path: '/gold',
    name: 'gold',
    component: resolve => require(['../page/gold'], resolve)
  },
  {
    path: '/snake',
    name: 'snake',
    component: resolve => require(['../page/snake'], resolve)
  },
  {
    path: '/sweep',
    name: 'sweep',
    component: resolve => require(['../page/sweep'], resolve)
  },

  ...NotFound,
  ...empty
];

export default new Router({ routes });
