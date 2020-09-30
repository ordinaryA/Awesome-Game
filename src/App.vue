<template>
  <div id="app">
    <router-view v-if="isRefresh" />
    <!-- 弹框 -->
    <Alert />
    <!-- 暴走漫画 -->
    <Awesome />
    <!-- 侧边条 -->
    <Fixed />
  </div>
</template>

<script>
import Alert from "./components/alert";
import Awesome from "./components/awesome";
import Fixed from "./components/fixed";
import { mapState } from "vuex";
import { DISPATCH, SET_SESSION, COMMIT } from "./utils";
export default {
  name: "App",
  data() {
    return {
      isRefresh: true,
    };
  },
  provide() {
    return {
      reload: this.reload,
    };
  },
  beforeCreate() {
    DISPATCH("initStore", this);
  },
  created() {
    this.listenRefresh();
  },
  methods: {
    /**
     * @param {null}
     * @return {void}
     */
    reload() {
      this.isRefresh = false;
      this.$nextTick(() => (this.isRefresh = true));
    },

    /**
     * 监听刷新事件
     * @param {null}
     * @return {void}
     */
    listenRefresh() {
      window.addEventListener("beforeunload", () => {
        //在页面刷新前初始化部分store
        COMMIT({
          submit: {
            alertQueue: [], //alert队列初始化
            cartoon: {}, //漫画初始化
          },
        });
        //保存store
        SET_SESSION("store", JSON.stringify(this.$store.state));
      });
    },
  },
  components: {
    Alert,
    Awesome,
    Fixed,
  },
};
</script>

<style></style>

<!-- 摸个小鱼 今天太忙了 -->
<!-- 测试ssh 链接 -->
