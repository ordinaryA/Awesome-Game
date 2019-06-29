import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    //alert组件参数
    alertQueue: [], //alert队列
    alertId: 0, //alert唯一键值
    alertClearTimer: null, //alert唯一显示的延时器 
    //漫画组件参数
    cartoon: {}, //漫画组件参数
  },
  getters: {},
  mutations: {
    /*
     * 新增alert队列
     * @param {object} state
     * @param {Boolean} data
     */
    handleAlert(state, data) {
      state.alertId += 1;
      if (data.clear) {
        //页面只显示唯一alert
        clearTimeout(state.alertClearTimer);
        state.alertQueue = [];
        state.alertQueue.push({
          ...data,
          alertId: state.alertId
        });
        state.alertClearTimer = setTimeout(() => {
          state.alertQueue.shift(1);
        }, 2000)
      } else {
        //页面显示多个alert
        state.alertQueue.push({
          ...data,
          alertId: state.alertId
        });
        setTimeout(() => {
          state.alertQueue.shift(1);
        }, 2000)
      }
    },

    /*
     * 显示暴漫图片
     * @param {object} state
     * @param {Boolean} data
     */
    showCartoon(state, data) {
      state.cartoon = data
    }
  },
  actions: {}
});
export default store;
