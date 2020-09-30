/**
 * v-first指令的混入方法
 */
import { WOW } from "wowjs";

export default {
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      this.alan_timoutAnimate();
    });
  },
  methods: {
    /**
     * 延迟加载动画
     * @param {void}
     * @return {void}
     */
    alan_timoutAnimate() {
      const options = {
        boxClass: "wow",
        animateClass: "animated",
        mobile: true,
        live: true
      };
      new WOW(options).init();
    },
  },
};
