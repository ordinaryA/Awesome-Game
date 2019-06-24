import {
  WOW
} from "wowjs";
export default {
  data() {
    return {}
  },
  created() {
    this.$nextTick(() => {
      this.alan_timoutAnimate();
    });
  },
  methods: {
    /**
     * 延迟加载动画
     * @param {null}
     * @return {void}
     */
    alan_timoutAnimate() {
      const options = {
        boxClass: "wow",
        animateClass: "animated",
        mobile: true,
        live: false
      };
      const wow = new WOW(options).init();
    },
  }
}
