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
      lineLength: 30, //绳子长度
      lineAngle: -90, //绳子与Y轴角度
      hookStartPos: [683, 0], //绳子起点坐标
      hookPos: [683, 30], //钩子坐标
      hookTimer: null, //钩子计时器
      hookIsRotate: true, //钩子是否正在旋转
      grabTimer: null, //钩子抓出计时器
      hookIsGrab: false //钩子是否正在抓取
    };
  },
  created() {
    this.bindKeycode();
    this.rotateHooks();
  },
  computed: {
    /**
     * 绳子的绘制路径
     * @returns {string}
     */
    pathParams() {
      const {
        hookStartPos: [x1, y1],
        hookPos: [x2, y2]
      } = this;
      const path = `M${x1} ${y1} L${x2} ${y2} Z`;
      return path;
    }
  },
  methods: {
    /**
     * 生成定时器，旋转钩子
     * @param {void}
     * @returns {void}
     */
    rotateHooks() {
      this.hookTimer = setInterval(() => {
        //1.0 判断钩子长度大于某长度后缩短
        if (this.lineLength > 100) {
          this.lineLength = 30;
          this.hookIsGrab = false;
          this.hookIsRotate = true;
        }
        //1.0 判断钩子是否正在旋转
        if (this.hookIsRotate) {
          this.lineAngle += 1;
          // 旋转时设置不能抓取
          this.hookIsGrab = false;
        }
        //2.0 判断钩子是否正在抓取
        if (this.hookIsGrab) {
          this.lineLength += 3;
        }
        this.computHooksPos();
      }, 30);
    },

    /**
     * 绑定键盘事件
     * @param {void}
     * @returns {void}
     */
    bindKeycode() {
      document.onkeydown = ({ keyCode }) => {
        const { hookIsRotate } = this;
        switch (keyCode) {
          //下
          case 40: {
            if (hookIsRotate) {
              this.hookIsRotate = false;
              this.hookIsGrab = true;
            }
            break;
          }
        }
      };
    },

    /**
     * 计算钩子坐标
     * @param {void}
     * @returns {void}
     */
    computHooksPos() {
      const {
        hookPos,
        lineAngle,
        lineLength,
        hookStartPos: [x0, y0]
      } = this;
      // 1.0 算出弧度
      const radian = ((2 * Math.PI) / 360) * lineAngle;
      const x1 = ~~Math.abs(x0 + Math.sin(radian) * lineLength);
      const y1 = ~~Math.abs(y0 - Math.cos(radian) * lineLength);
      //2.0 计算绘制在SVG上的坐标x
      this.hookPos = [x1, y1];
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@style/gold.scss";
</style>