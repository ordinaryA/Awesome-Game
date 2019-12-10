<template>
  <div class="gold_bg">
    <div class="w1440 noScroll">
      <div class="row site">
        <div class="sm-12 md-12 col">
          <div
            class="paper"
            v-first="{name:'translateRight',duration:'0.4s',delay:'0.5s',offset:'0'}"
          >
            <canvas class="hook_canvas" ref="hookCanvas"></canvas>
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
      hookPos: [100, 100]
    };
  },
  created() {
    this.$nextTick(() => {
      const { hookCanvas } = this.$refs;
      const ctx = hookCanvas.getContext("2d");
      ctx.save();
      ctx.translate(0.5, 0.5);
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(10, 100);
      ctx.lineTo(300, 100);
      ctx.stroke();
      ctx.restore();
    });
  },
  mounted() {},
  computed: {},
  methods: {}
};
</script>

<style lang="scss" scoped>
@import "@style/gold.scss";
</style>