<template>
  <div class="gold_bg">
    <div class="w1440 noScroll">
      <div class="row site">
        <div class="sm-12 md-12 col">
          <div
            class="paper"
            v-first="{name:'translateRight',duration:'0.4s',delay:'0.5s',offset:'0'}"
          >
            <svg width="100%" height="100%" version="1.1" xmlns="http://www.w3.org/2000/svg">
              <line
                x1="0"
                y1="0"
                x2="50"
                y2="50"
                ref="hooks"
                style="stroke:rgb(99,99,99);stroke-width:2"
              />
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
      hookPos: [100, 100],
      hookTimer: null
    };
  },
  created() {
    this.test();
  },
  computed: {},
  methods: {
    test() {
      let [x2, y2] = this.hookPos;
      this.hookTimer = setInterval(() => {
        this.hookPos = [(x2 += 50), (y2 += 50)];
        this.setLinePos();
      }, 300);
    },
    setLinePos() {
      const [x2, y2] = this.hookPos;
      const { hooks } = this.$refs;
      hooks.setAttribute("x2", x2);
      hooks.setAttribute("y2", y2);
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@style/gold.scss";
</style>