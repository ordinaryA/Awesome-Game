/*
 * @Author: Alan 
 * @Date: 2019-07-04 20:33:57  
 * @Last Modified by:   Alan 
 * @Last Modified time: 2019-07-16 20:48:23 
 */

<template>
  <div class="bird_bg">
    <div class="w1440 noScroll">
      <div class="row site">
        <div
          class="sm-12 md-3 col sidebar"
          v-first="{
            name: 'translateLeft',
            duration: '0.5s',
            delay: '0.5s',
            offset: '0',
          }"
        >
          <div class="paper">
            <h3
              class="sidebar-title sidebar_h3"
              v-first="{
                name: 'translateTop',
                duration: '0.5s',
                delay: '0.8s',
                offset: '0',
              }"
            >
              管道小鸟 Flappy Bird
            </h3>
            <div class="row">
              <div
                class="collapsible full-width"
                v-for="(item, idx) in sidebar"
                :key="idx"
                v-first="{
                  name: 'translateTop',
                  duration: '0.5s',
                  delay: `${1 + idx * 0.2}s`,
                  offset: '0',
                }"
              >
                <input
                  :id="`collapsible-${item.title}`"
                  type="radio"
                  name="collapsible"
                />
                <label :for="`collapsible-${item.title}`">{{
                  item.title
                }}</label>
                <div class="collapsible-body">
                  <ul>
                    <li
                      class="paper_li"
                      v-for="(child, cIdx) in item.children"
                      :key="cIdx"
                      @click="sideBarMethod(child)"
                    >
                      {{ child.label }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="sm-12 md-9 col">
          <div
            class="paper"
            v-first="{
              name: 'translateRight',
              duration: '0.4s',
              delay: '0.5s',
              offset: '0',
            }"
          >
            <div
              class="spaceTip"
              v-first="{
                name: 'translateRight',
                duration: '0.4s',
                delay: '0.7s',
                offset: '0',
              }"
            >
              {{
                `空格键开始或跳跃（Space） 当前得分（Count）：${successCount}分`
              }}
            </div>
            <div
              class="scoreTip"
              v-first="{
                name: 'translateRight',
                duration: '0.4s',
                delay: '0.8s',
                offset: '0',
              }"
            >
              <span
                class="birdScoreSpan"
                v-for="(item, idx) in birdScore"
                :key="idx"
                v-first="{
                  name: 'translateRight',
                  duration: '0.5s',
                  delay: `${0.9 + idx * 0.2}s`,
                  offset: '0',
                }"
                >{{ item }}</span
              >
            </div>
            <div
              class="game_layout"
              v-first="{
                name: 'translateRight',
                duration: '0.4s',
                delay: '0.9s',
                offset: '0',
              }"
            >
              <div class="bird_box" ref="birdBox">
                <transition name="alanAlert">
                  <div class="bird_h3" v-if="!isStart">
                    <span
                      v-first="{
                        name: 'translateTop',
                        duration: '0.5s',
                        delay: '1.4s',
                        offset: '0',
                      }"
                      >Game Start!!!</span
                    >
                    <br />
                    <span
                      v-first="{
                        name: 'translateTop',
                        duration: '0.5s',
                        delay: '1.6s',
                        offset: '0',
                      }"
                      >Just do it!Foolish guys!</span
                    >
                  </div>
                </transition>
                <transition name="alanAlert">
                  <img
                    v-show="successTip.isShow"
                    :style="successAttr"
                    class="success_img"
                    src="../../assets/img/bird/success.png"
                    alt
                  />
                </transition>
                <div
                  :class="{
                    birdRoate: birdData.sports == 'fall',
                    birdJump: birdData.sports == 'jump',
                  }"
                  class="bird"
                  ref="bird"
                  :style="birdAttr"
                >
                  <div class="birdWing"></div>
                </div>
                <div
                  class="pipFar"
                  v-for="(item, idx) in pipeArr"
                  :key="idx"
                  :style="{ right: item.right + 'px' }"
                >
                  <img
                    class="pipe"
                    :src="item.topPipeSrc"
                    :style="{ top: item.topPipeTop + 'px' }"
                    alt
                  />
                  <img
                    class="pipe"
                    :src="item.bottomPipeSrc"
                    :style="{ top: item.bottomPipeTop + 'px' }"
                    alt
                  />
                </div>
              </div>
              <div
                class="land"
                v-first="{
                  name: 'alanAlertIn',
                  duration: '0.5s',
                  delay: '1.1s',
                  offset: '0',
                }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { BIRD } from "@constants";
import { mapState, mapGetters } from "vuex";
import { $animate } from "../../mixins";
import { COMMIT } from "../../utils";
export default {
  mixins: [$animate],
  data() {
    return {
      sidebar: BIRD.sidebar, // 侧边栏
      currentMode: "normal", // 当前难度
      birdData: {
        top: 50,
        right: 700,
        sports: undefined, // 记录运动状态
      }, // 鸟对象
      AS: 500, // 加速度
      TS: 0, // 上抛速度
      jumpPower: 1, // 跳跃力度
      downTime: 0, // 记录时间
      isStart: false, // 是否开始
      timerNum: 20, // 计时器时间
      moveTimer: null, // 飞行计时器
      pipeArr: [], // 管道的集合
      pipeMoveDistance: 2, // 管道移动距离
      pipeDist: 100, // 每组管道之间的距离
      pipeTimer: null, // 管道定时器
      pipeDistance: 200, // 每组管道之间间隔的距离
      successTip: {
        top: 210,
        right: 500,
        isShow: false,
      }, //成功提示
      successCount: 0, // 成功得分
    };
  },
  mounted(){
    this.bindSpaceKey();
  },
  destroyed() {
    document.onkeydown = null;
    clearInterval(this.pipeTimer);
    clearInterval(this.moveTimer);
  },
  computed: {
    birdAttr() {
      return {
        top: this.birdData.top + "px",
        right: this.birdData.right + "px",
      };
    },
    successAttr() {
      return {
        top: this.successTip.top + "px",
        right: this.successTip.right + "px",
      };
    },
    ...mapState(["birdBestScore"]),
    ...mapGetters(["birdScore"]),
  },
  methods: {
    /**
     * 侧边栏事件
     * @param {object}
     * @returns {void}
     */
    sideBarMethod(item) {
      const { type } = item;
      switch (type) {
        case "difficulty":
          this.chooseDifficulty(item);
          break;
      }
    },

    /**
     * 选择难度
     * @param {object}
     * @returns {void}
     */
    chooseDifficulty({ speed, label }) {
      let type = "";
      this.currentMode = speed;
      switch (speed) {
        case "normal":
          this.jumpPower = 1;
          this.pipeMoveDistance = 2;
          this.pipeDistance = 200;
          type = "primary";
          break;
        case "hard":
          this.jumpPower = 1.1;
          this.pipeMoveDistance = 3;
          this.pipeDistance = 150;
          type = "warning";
          break;
        case "crazy":
          this.jumpPower = 1.2;
          this.pipeMoveDistance = 3;
          this.pipeDistance = 100;
          type = "danger";
          break;
      }
      clearInterval(this.pipeTimer);
      clearInterval(this.moveTimer);
      this.isStart = false;
      this.downTime = 0;
      this.pipeArr = [];
      this.HiAlert({
        type,
        content: `难度已切换为${label}`,
      });
    },

    /**
     * 绑定空格键
     * @param {void}
     * @returns {void}
     */
    bindSpaceKey() {
      document.onkeydown = ({ keyCode }) => {
        const { isStart } = this;
        if (keyCode == 32) {
          // 1.0 未开始则执行开始函数
          if (!isStart) {
            this.gameRestart();
          } else {
            // 2.0 开始则执行跳跃函数
            this.birdJump();
          }
        }
      };
    },

    /**
     * 开始运动
     * @param {void}
     * @returns {void}
     */
    birdMove() {
      let { timerNum, birdData, TS, AS } = this;
      clearInterval(this.moveTimer);
      // 1.0 获取初始化top值
      const lastTop = birdData.top;
      this.moveTimer = setInterval(() => {
        // 2.0 时间单位转换为秒
        this.downTime += timerNum / 1000;
        const { downTime } = this;
        // 3.0 上一次跳跃的距离 + 当前产生的位移 (下落距离 -上抛距离 )
        const currentTop = 0.5 * AS * downTime * downTime - TS * downTime;
        const AH = lastTop + currentTop;
        if (AH > lastTop) {
          if (birdData.sports != "fall") birdData.sports = "fall";
        } else {
          if (birdData.sports != "jump") birdData.sports = "jump";
        }
        // 4.0 判断底边界
        const { birdBox, bird } = this.$refs;
        const bottomBorder = birdBox.offsetHeight;
        const birdHeight = bird.offsetHeight;
        if (AH > bottomBorder) {
          birdData.top = bottomBorder - birdHeight;
          clearInterval(this.moveTimer);
        } else {
          birdData.top = AH;
        }
      }, timerNum);
    },

    /**
     * 跳跃
     * @param {void}
     * @returns {void}
     */
    birdJump() {
      const { jumpPower } = this;
      // 1.0 初始化记录的下落时间
      this.downTime = 0;
      // 2.0 设置上抛速度
      this.TS = 200 * jumpPower;
      // 3.0 重新执行运动函数
      this.birdMove();
    },

    /**
     * 管道移动
     * @param {void}
     * @returns {void}
     */
    pipeMove() {
      const { birdBox } = this.$refs;
      const { pipeArr, pipeDistance, pipeMoveDistance } = this;
      const birdWidth = birdBox.offsetWidth;
      clearInterval(this.pipeTimer);
      this.pipeTimer = setInterval(() => {
        // 1.0 第一个管道超出边界则删除
        if (pipeArr[0].right > birdWidth) {
          pipeArr.shift();
        }
        // 2.0 最后一个管道距离右边界大于时则生成一组管道
        const lastPipe = pipeArr[pipeArr.length - 1];
        if (lastPipe.right > pipeDistance) {
          this.createPipe();
        }
        // 3.0 移动管道
        for (let i = 0; i < pipeArr.length; i++) {
          const item = pipeArr[i];
          item.right += pipeMoveDistance;
        }
        // 4.0 判断小鸟是否通过管道
        for (let i = 0; i < pipeArr.length; i++) {
          const item = pipeArr[i];
          // 找到第一个当前正在通过的管道
          if (item.isCross == "no") {
            const res = this.judgeIsPassPipe(item);
            switch (res) {
              // 成功通过
              case "isSuccess":
                this.passPipe();
                item.isCross = "is";
                break;
              // 失败了
              case "isFail":
                this.gameOver();
                break;
              // 正在飞
              case "isFlying":
                break;
            }
            break;
          }
        }
      }, 30);
    },

    /**
     * 判断小鸟是否通过管道
     * @param {object}
     * @returns {string}
     */
    judgeIsPassPipe({ right, topPipeTop, bottomPipeTop }) {
      const { birdData } = this;
      const { top: birdtop, right: birdRight } = birdData;
      const pipeWidth = 52, // 管道宽度
        pipeHeight = 420, // 管道高度
        birdHeight = 30, // 鸟的高度
        errorAllow = 5; // 误差值
      // 1.0 先判断是否已经通过
      if (birdRight <= right) {
        return "isSuccess";
      }
      // 2.0 未通过则判断当鸟进入管道的左右边界情况
      if (birdRight <= right + pipeWidth && birdRight > right) {
        // 3.0 判断鸟是否触碰到上下边界或更多
        if (
          birdtop + errorAllow <= topPipeTop + pipeHeight ||
          birdtop + birdHeight - errorAllow >= bottomPipeTop
        ) {
          return "isFail";
        }
      }
      return "isFlying";
    },

    /**
     * 判断小鸟是否通过管道
     * @param {void}
     * @returns {void}
     */
    passPipe() {
      const { birdData } = this;
      this.successCount++;
      this.successTip = {
        top: birdData.top,
        right: birdData.right - 120,
        isShow: true,
      };
      setTimeout(() => {
        this.successTip.isShow = false;
      }, 500);
    },

    /**
     * 判断小鸟是否通过管道
     * @param {void}
     * @returns {void}
     */
    gameOver() {
      clearInterval(this.pipeTimer);
      clearInterval(this.moveTimer);
      const { successCount, currentMode } = this;
      this.isStart = false;
      this.downTime = 0;
      this.pipeArr = [];
      if (successCount > this.birdBestScore[currentMode]) {
        COMMIT({ birdRecord: [currentMode, successCount] });
        this.HiAlert({
          type: "success",
          content: "恭喜你打破了记录！！！",
        });
        this.HiImg({ type: "win" });
      } else {
        this.HiAlert({
          type: "danger",
          content: "你挂了",
        });
        this.HiImg({ type: "fail" });
      }
    },

    /**
     * 游戏重新开始
     * @param {void}
     * @returns {void}
     */
    gameRestart() {
      this.HiImg({ isShow: "hide" });
      this.createPipe();
      this.pipeMove();
      this.birdMove();
      this.successCount = 0;
      this.isStart = true;
    },

    /**
     * 创造管道
     * @param {void}
     * @returns {void}
     */
    createPipe() {
      const { pipeDist, pipeArr } = this;
      const { birdBox } = this.$refs;
      const birdHeight = birdBox.offsetHeight;
      const topH = ~~(Math.random() * (birdHeight - pipeDist - 50));
      // 1.0 创造一组管道
      const initRight = 300; // 管道离右边的初始距离
      const pipeW = 52; // 管道图片宽度
      const pipeH = 420; // 管道图片高度
      const pipe = {
        right: -pipeW,
        topPipeTop: topH - pipeH,
        topPipeSrc: require("../../assets/img/bird/pipeTop.png"),
        bottomPipeTop: topH + pipeDist,
        bottomPipeSrc: require("../../assets/img/bird/pipeBottom.png"),
        isCross: "no", // 是否已被穿过
      };
      pipeArr.push(pipe);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@style/bird.scss";
</style>