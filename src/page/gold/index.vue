<template>
  <div class="gold_bg">
    <div class="w1440 noScroll">
      <div class="row site">
        <div class="sm-12 md-12 col">
          <div
            class="paper"
            v-first="{name:'translateRight',duration:'0.4s',delay:'0.5s',offset:'0'}"
          >
            <div class="game_container" :style="gameArea">
              <svg
                :style="gameArea"
                class="svg_dise"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path :d="pathParams" class="hooksLine" />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { GOLD } from "@constants";
import { mapState } from "vuex";
import { $animate } from "../../mixins";

// 绳子默认长度
const LINE_DEFAULT_LENGTH = 30;
// SVG的宽高
const SVG_WIDTH = 1366;
const SVG_HEIGHT = 400;

export default {
  mixins: [$animate],
  data() {
    return {
      lineLength: LINE_DEFAULT_LENGTH, //绳子长度
      lineAngle: -90, //绳子与Y轴角度
      hookStartPos: [683, 0], //绳子起点坐标
      hookPos: [683, LINE_DEFAULT_LENGTH], //钩子坐标
      hookTimer: null, //钩子计时器
      hookIsRotate: true, //钩子是否正在旋转
      grabTimer: null, //钩子抓出计时器
      hookIsGrab: false, //钩子是否正在抓取
      lineIsShorting: false //绳子正在收缩
    };
  },
  created() {
    // 绑定键盘事件
    this.bindKeycode();
    // 设置定时器
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
    },

    /**
     * 返回游戏区域大小
     * @returns {object}
     */
    gameArea() {
      return { width: `${SVG_WIDTH}px`, height: `${SVG_HEIGHT}px` };
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
        // 计算钩子坐标
        this.computHooksPos();
        //1.0 判断钩子是否正在旋转
        if (this.hookIsRotate) {
          // 旋转时增加角度，设置不能抓取
          this.lineAngle += 1;
          this.hookIsGrab = false;
          return;
        }
        //2.0 判断钩子是否正在抓取
        if (this.hookIsGrab) {
          //2.1 判断钩子长度大于某长度后缩短
          this.drawLineIsShorten();
          //2.2 判断绳子快接近边界时开始往回收
          const isNearBorder = this.judgeLineNearBorder();
          if (isNearBorder) {
            this.lineIsShorting = true;
          } else {
            this.lineLength += 3;
          }
          return;
        }
      }, 30);
    },

    /**
     * 判断绳子是否快接近边界
     * @param {void}
     * @returns {boolean}
     */
    judgeLineNearBorder() {
      const [x, y] = this.hookPos;

      // 接近SVG边界的临界值
      const NEAR_NUMBER = 50;
      if (
        SVG_WIDTH - x < NEAR_NUMBER ||
        SVG_HEIGHT - y < NEAR_NUMBER ||
        x < NEAR_NUMBER
      ) {
        return true;
      }
      return false;
    },

    /**
     * 绳子缩短到正常长度
     * @param {void}
     * @returns {void}
     */
    drawLineIsShorten() {
      // 如果绳子收缩状态为true时
      if (this.lineIsShorting) {
        this.lineLength -= 10;
        if (this.lineLength < LINE_DEFAULT_LENGTH) {
          // 恢复正常绳子长度，钩子恢复旋转
          this.lineLength = LINE_DEFAULT_LENGTH;
          this.setHookStatus("startRotate");
        }
      }
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
              this.setHookStatus("startGrab");
            }
            break;
          }
        }
      };
    },

    /**
     * 设置钩子状态
     * @param {string}
     * @returns {void}
     */
    setHookStatus(status) {
      switch (status) {
        case "startRotate": {
          this.hookIsRotate = true;
          this.lineIsShorting = false;
          break;
        }
        case "startGrab": {
          this.hookIsRotate = false;
          this.hookIsGrab = true;
          break;
        }
      }
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