<template>
  <div class="gold_bg">
    <div class="w1440 noScroll">
      <div class="row site">
        <div class="sm-12 md-12 col">
          <div
            class="paper"
            v-first="{name:'translateRight',duration:'0.4s',delay:'0.5s',offset:'0'}"
          >
            <svg class="hook_svg" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <path :d="pathParams" class="hooksLine" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { $animate } from "../../mixins";
import { COMMIT } from "../../utils";

export default {
  mixins: [$animate],
  data() {
    return {
      hookPos: [50, 50],
      hookTimer: null
    };
  },
  created() {
    this.test();
  },
  computed: {
    /**
     * 绳子的绘制路径
     * @returns {string}
     */
    pathParams() {
      const [x, y] = this.hookPos;
      const path = `M683 0 L${x} ${y} Z`;
      return path;
    }
  },
  methods: {
    circleLine() {
      
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@style/gold.scss";
</style>