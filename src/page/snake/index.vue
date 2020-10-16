<template>
  <div class="snake_bg">
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
              贪恰蛇 Gluttonous Snake
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
        <div
          class="sm-12 md-9 col"
          v-first="{
            name: 'translateRight',
            duration: '0.5s',
            delay: '0.8s',
            offset: '0',
          }"
        >
          <div class="paper score_father">
            <div class="row child-borders cont_btn">
              <span
                class="paper-btn"
                v-for="(item, idx) in buttonList"
                :key="idx"
                @click="switchEvent(item)"
                v-first="{
                  name: 'translateTop',
                  duration: '0.5s',
                  delay: `${1 + idx * 0.2}s`,
                  offset: '0',
                }"
                >{{ item.label }}</span
              >
            </div>
            <div
              class="content"
              v-first="{
                name: 'translateTop',
                duration: '0.5s',
                delay: `${1 + buttonList.length * 0.2}s`,
                offset: '0',
              }"
            >
              <div class="layout" ref="layout">
                <ul
                  class="check_ul cl"
                  v-for="(col, cIdx) in formattCheck"
                  :key="cIdx"
                >
                  <li
                    v-for="(row, rIdx) in col"
                    :key="rIdx"
                    :style="handleLiStyle"
                    :ref="`li_${cIdx}`"
                  ></li>
                </ul>
              </div>
              <transition name="alan_scale">
                <div class="stop" v-show="isStop">
                  <img src="../../assets/img/snake/stop.png" alt />
                </div>
              </transition>
            </div>
            <div
              class="score"
              v-first="{
                name: 'translateTop',
                duration: '0.5s',
                delay: '1.9s',
                offset: '0',
              }"
            >
              <div>{{ `当前得分：${score}分` }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { SNAKE } from "@constants";
import { COMMIT } from "../../utils";
import { $animate } from "../../mixins";
export default {
  inject: ["reload"],
  mixins: [$animate],
  data() {
    return {
      checkerArea: [50, 50], // 棋盘横纵格子数
      currentMode: "classicMode", // 当前游戏魔模式
      sidebar: SNAKE.sidebar, // 侧边栏
      buttonList: SNAKE.buttonList, // 按钮栏
      liStyle: {}, // 棋盘样式
      snakeLength: 4, // 蛇的初始长度
      boardBorder: false, // 棋盘边框
      snake: [], // 蛇的容器
      food: [], // 食物的坐标
      direction: undefined, // 移动方向
      moveTimer: undefined, // 蛇移动的定时器
      isStop: true, // 是否暂停
      wait: true, // 等待方向更改完成才能再次修改方向
      speed: 200, // 蛇速度
      score: 0, // 当前得分
    };
  },
  computed: {
    /**
     * 二维数组
     * @returns {array}
     */
    formattCheck() {
      const [a, b] = this.checkerArea;
      const res = [];
      for (let i = 0; i < a; i++) {
        const arr = [];
        for (let n = 0; n < b; n++) {
          arr[n] = n;
        }
        res[i] = arr;
      }
      return res;
    },

    /**
     * 棋盘样式
     * @returns {object}
     */
    handleLiStyle() {
      let { liStyle, boardBorder } = this;
      const border = "1px solid #aaa";
      if (boardBorder) {
        liStyle = { ...liStyle, border };
      }
      return liStyle;
    },
  },
  created() {
    // 1.0 生成蛇的二维数组
    this.createSnake();
    this.$nextTick(() => {
      // 2.0 初始化棋盘样式
      this.initStyle();
      // 3.0 画出一条蛇
      this.drawSnake();
      // 4.0 随机生成食物
      this.createFood();
    });
  },
  mounted() {
    // 绑定键盘事件
    this.bindKeycode();
  },
  destroyed() {
    document.onkeydown = null;
    clearInterval(this.moveTimer);
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
        case "board":
          this.chooseBoard(item);
          break;
        case "difficulty":
          this.chooseDifficulty(item);
          break;
        case "mode":
          this.chooseMode(item);
          break;
      }
    },

    /**
     * 选择模式
     * @param {object}
     * @returns {void}
     */
    chooseMode({ type, mode, label }) {
      let tip = `已切换为${label}`;
      let alertType = "success";
      switch (mode) {
        case "classicMode":
          this.currentMode = mode;
          break;
        case "freeMode":
          this.currentMode = mode;
          break;
        case "adventureMode":
          tip = `暂未开放`;
          alertType = "warning";
          break;
      }
      this.restartGame();
      this.HiAlert({
        type: alertType,
        content: tip,
      });
    },

    /**
     * 选择难度
     * @param {object}
     * @returns {void}
     */
    chooseDifficulty({ speed, label }) {
      let type = "";
      switch (speed) {
        case "normal":
          this.speed = 80;
          type = "primary";
          break;
        case "hard":
          this.speed = 60;
          type = "warning";
          break;
        case "crazy":
          this.speed = 30;
          type = "danger";
          break;
      }
      this.isStop = true;
      clearInterval(this.moveTimer);
      this.HiAlert({
        type,
        content: `难度已切换为${label}`,
      });
    },

    /**
     * 选择棋盘size
     * @param {object}
     * @returns {void}
     */
    chooseBoard({ size, label }) {
      switch (size) {
        case "twenty":
          this.checkerArea = [20, 20];
          break;
        case "fifty":
          this.checkerArea = [50, 50];
          break;
        case "seventy":
          this.checkerArea = [70, 70];
          break;
        case "hundred":
          this.checkerArea = [100, 100];
          break;
        case "border":
          this.boardBorder = !this.boardBorder;
          return;
      }
      this.HiAlert({
        type: "success",
        content: `棋盘已设置为${label}`,
      });
      this.initStyle();
      this.restartGame();
    },

    /**
     * 按钮事件
     * @param {void}
     * @returns {void}
     */
    snakeAlert() {
      this.HiAlert({
        type: "warning",
        content: "This is just a test button",
      });
    },

    /**
     * 按钮事件
     * @param {object}
     * @returns {void}
     */
    switchEvent({ type }) {
      switch (type) {
        case "restart":
          this.restartGame();
          this.HiAlert({
            type: "success",
            content: "游戏已重置！",
          });
          break;
        case "stop":
          this.stopGame();
          break;
        case "alert":
          this.snakeAlert();
          break;
      }
    },

    /**
     * 暂停游戏
     * @param {void}
     * @returns {void}
     */
    stopGame() {
      const { isStop } = this;
      if (!isStop) {
        clearInterval(this.moveTimer);
        this.HiAlert({
          type: "secondary",
          content: "游戏已暂停！",
          clear: true,
        });
      } else {
        this.HiImg({ isShow: "hide" });
        this.HiAlert({
          type: "success",
          content: "游戏已开始！",
          clear: true,
        });
        this.gameStart();
      }
      this.isStop = !isStop;
    },

    /**
     * 重新开始游戏
     * @param {void}
     * @returns {void}
     */
    restartGame() {
      this.score = 0;
      this.isStop = true;
      clearInterval(this.moveTimer);
      // 1.0 清空蛇和食物
      const { layout } = this.$refs;
      const liArr = layout.querySelectorAll("li");
      for (let i = 0, l = liArr.length; i < l; i++) {
        const li = liArr[i];
        li.className = "";
      }
      // 2.0 生成蛇的二维数组
      this.createSnake();
      // 3.0 画出一条蛇
      this.drawSnake();
      // 4.0 随机生成食物
      this.createFood();
    },

    /**
     * 游戏开始
     * @param {void}
     * @returns {void}
     */
    gameStart() {
      const { speed } = this;
      clearInterval(this.moveTimer);
      this.moveTimer = setInterval(() => {
        this.snakeMove();
        this.wait = true;
      }, speed);
    },

    /**
     * 按键改变方向
     * @param {void}
     * @returns {void}
     */
    bindKeycode() {
      document.onkeydown = ({ keyCode }) => {
        const { direction, wait } = this;
        // 1.0 不等于相反方向时按键改变蛇的方向
        switch (keyCode) {
          // 左
          case 37:
            if (direction != "right" && wait) {
              this.direction = "left";
              this.wait = false;
            }
            break;
          // 上
          case 38:
            if (direction != "down" && wait) {
              this.direction = "up";
              this.wait = false;
            }
            break;
          // 右
          case 39:
            if (direction != "left" && wait) {
              this.direction = "right";
              this.wait = false;
            }
            break;
          // 下
          case 40:
            if (direction != "up" && wait) {
              this.direction = "down";
              this.wait = false;
            }
            break;
          // 空格
          case 32:
            this.stopGame();
            break;
        }
      };
    },

    /**
     * 移动一条蛇
     * @param {void}
     * @returns {void}
     */
    snakeMove() {
      const { direction, snake, currentMode } = this;
      let [r, c] = snake[0]; // 第r行的第c个
      let headAfter = [];
      switch (direction) {
        case "up":
          headAfter = [r - 1, c];
          break;
        case "down":
          headAfter = [r + 1, c];
          break;
        case "left":
          headAfter = [r, c - 1];
          break;
        case "right":
          headAfter = [r, c + 1];
          break;
      }
      // 判断蛇头是否在自己身上
      if (this.judgeHeadInSelfBody()) {
        this.gameOver();
        return;
      }
      // 判断蛇头在当前游戏模式失败则游戏结束
      const res = this[currentMode](headAfter);
      switch (currentMode) {
        // 经典模式
        case "classicMode":
          if (!res) {
            this.gameOver();
            return;
          }
          break;
        // 自由模式
        case "freeMode":
          headAfter = res;
          break;
      }
      if (this.isAteFood()) {
        // 吃到食物则重新生成一个食物
        this.createFood();
      } else {
        // 未到食物则删除获取最后一个元素坐标
        const [row, col] = snake.pop();
        const li = this.$refs[`li_${row}`][col];
        li.className = "";
      }
      snake.unshift(headAfter);
      this.drawSnake();
    },

    /**
     * 经典模式
     * @param {array}
     * @returns {boolean}
     */
    classicMode([row, col]) {
      const [R, C] = this.checkerArea;
      if (row < 0 || col < 0 || row == R || col == C) {
        return false;
      } else {
        return true;
      }
    },

    /**
     * 自由模式
     * @param {array}
     * @returns {array}
     */
    freeMode([row, col]) {
      let [R, C] = this.checkerArea;
      R -= 1;
      C -= 1;
      let snakeHead = [row, col];
      // 蛇头到达上边界时 蛇头坐标变为棋盘下边界
      if (row < 0) {
        snakeHead = [R, col];
      }
      // 蛇头到达左边界时 蛇头坐标变为棋盘右边界
      if (col < 0) {
        snakeHead = [row, C];
      }
      // 蛇头到达下边界时 蛇头坐标变为棋盘上边界
      if (row > R) {
        snakeHead = [0, col];
      }
      // 蛇头到达右边界时 蛇头坐标变为棋盘左边界
      if (col > C) {
        snakeHead = [row, 0];
      }
      return snakeHead;
    },

    /**
     * 冒险模式
     * @param {array}
     * @returns {array}
     */

    /**
     * 游戏结束
     * @param {void}
     * @returns {void}
     */
    gameOver() {
      clearInterval(this.moveTimer);
      this.score = 0;
      this.restartGame();
      this.HiAlert({
        type: "danger",
        content: "游戏结束！",
      });
      this.HiImg({ type: "fail" });
    },

    /**
     * 判断是否吃到了食物
     * @param {void}
     * @returns {void}
     */
    isAteFood() {
      const [foodRow, foodCol] = this.food;
      const [headRow, headCol] = this.snake[0];
      if (foodRow == headRow && foodCol == headCol) {
        this.score++;
        return true;
      } else {
        return false;
      }
    },

    /**
     * 创建一条蛇
     * @param {void}
     * @returns {void}
     */
    createSnake() {
      const {
        snakeLength: l,
        checkerArea: [r, c],
      } = this;
      // 1.0 避免随机头部在边界且容的下蛇的长度
      const row = ~~(Math.random() * (r - l - 1) + 1);
      const col = ~~(Math.random() * (c - l - 1) + 1);
      // 2.0 头部坐标
      const head = [row, col];
      const body = [];
      // 3.0 随机生成蛇
      const ran = Math.random();
      if (ran > 0.5) {
        for (let i = row + 1; i < row + l; i++) {
          body.push([i, col]);
          // 4.0 定义蛇移动的方向
          this.direction = "up";
        }
      } else {
        for (let i = col + 1; i < col + l; i++) {
          body.push([row, i]);
          this.direction = "left";
        }
      }
      this.snake = [head, ...body];
    },

    /**
     * 画一条蛇
     * @param {void}
     * @returns {void}
     */
    drawSnake() {
      const { snake } = this;
      // 1.0 解构 a:横轴坐标 b:纵轴坐标
      snake.map(([a, b], idx) => {
        // 2.0 根据坐标获取元素
        const li = this.$refs[`li_${a}`][b] || undefined;
        if (!li) {
          return;
        }
        if (idx == 0) {
          li.className = "snake_head";
        } else {
          li.className = "snake_body";
        }
      });
    },

    /**
     * 创建一个食物
     * @param {void}
     * @returns {void}
     */
    createFood() {
      const {
        checkerArea: [x, y],
        snake,
      } = this;
      // 1.0 食物的坐标与蛇重叠则重新随机
      while (true) {
        const row = Math.floor(Math.random() * x);
        const col = Math.floor(Math.random() * y);
        for (let i = 0; i < snake.length; i++) {
          const [a, b] = snake[i];
          if (row != a && col != b) {
            this.food = [row, col];
            // 2.0 修改食物坐标样式
            const food = this.$refs[`li_${row}`][col];
            food.className = "food";
            return;
          }
        }
      }
    },

    /**
     * 判断蛇头是否在自己身上
     * @param {void}
     * @returns {void}
     */
    judgeHeadInSelfBody() {
      // 拷贝数组
      const body = JSON.parse(JSON.stringify(this.snake));
      // 删除数组第一项并返回蛇头坐标
      const [x, y] = body.shift(1);
      for (let i = 0; i < body.length; i++) {
        const [a, b] = body[i];
        if (a == x && b == y) {
          return true;
        }
      }
    },

    /**
     * 初始化棋盘样式
     * @param {void}
     * @returns {void}
     */
    initStyle() {
      const { layout } = this.$refs,
        { offsetWidth, offsetHeight } = layout,
        [a, b] = this.checkerArea,
        w = parseInt(offsetWidth / b) + "px",
        h = parseInt(offsetHeight / a) + "px";
      this.liStyle = { width: w, height: h };
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@style/snake.scss";
</style>