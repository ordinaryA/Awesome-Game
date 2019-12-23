<template>
  <div class="gold_bg">
    <div class="w1440 noScroll">
      <div class="row site">
        <div class="sm-12 md-12 col">
          <div
            class="paper"
            v-first="{
              name: 'translateRight',
              duration: '0.4s',
              delay: '0.5s',
              offset: '0'
            }"
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
              <div
                v-for="(item, idx) in handleItemList"
                class="items_class"
                :class="item.className"
                :style="item.style"
                :key="`gold_item_${idx}`"
              ></div>
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
const SVG_HEIGHT = 700;
// 接近SVG边界的临界值
const NEAR_NUMBER = 20;

// 未钩中时的默认重量
const DEFAULT_WEIGHT = 10;
// 钩子旋转角度速度
const HOOKS_ROTATE_SPEED = 1;
// 钩子向下抓取速度
const HOOK_CATCH_SPEED = 7;

export default {
  mixins: [$animate],
  data() {
    return {
      // 初始状态
      lineLength: LINE_DEFAULT_LENGTH, // 绳子长度
      lineAngle: -90, // 绳子与Y轴角度
      hookStartPos: [683, 0], // 绳子起点坐标
      hookPos: [683, LINE_DEFAULT_LENGTH], // 钩子坐标
      hookTimer: null, // 钩子计时器

      // 关卡物品列表
      currentLevel: 1, // 当前关卡
      itemsList: [], // 黄金石头等等啥玩意的集合
      itemsIdx: undefined, //抓取到物品的索引

      // 钩子抓取状态
      hookIsRotate: true, // 钩子是否正在旋转
      hookIsGrab: false, // 钩子是否正在抓取
      hookIsBack: false, // 钩子是否正在收缩
      isCatchItem: false // 钩子是否已经抓取到物品
    };
  },
  created() {
    // 绑定键盘事件
    this.bindKeycode();
    // 生成黄金和石头
    this.createItems();
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
    },

    /**
     * 处理物品数组，方便来渲染到html
     * @returns {array}
     */
    handleItemList() {
      const list = this.itemsList.map(({ width, height, pos, className }) => {
        const item = {
          style: {
            width: `${width}px`,
            height: `${height}px`,
            top: `${pos[1]}px`,
            left: `${pos[0]}px`
          },
          className
        };
        return item;
      });
      return list;
    }
  },
  methods: {
    /**
     * 生成物品
     * @param {void}
     * @returns {void}
     */
    createItems() {
      const { currentLevel, hookStartPos } = this;
      // 获取当前关卡物品数组
      const arr = this.handleLevel();
      const result = [];
      // 1.0 遍历关卡抓取物的属性来生成数组
      for (let i = 0; i < arr.length; i++) {
        const item = arr[i];
        // 2.0 随机生成一个坐标
        const x = ~~(Math.random() * SVG_WIDTH);
        const y = ~~(Math.random() * SVG_HEIGHT);
        const randomItems = { ...item, pos: [x, y] };

        // 3.0 判断坐标是否超出SVG区域
        if (this.judgeIsExceedBorder(randomItems)) {
          i--;
          continue;
        }

        // 4.0 出现在钩子起点半径为80范围内重新生成
        const HOOKS_AREA_ERROR = 80;
        const [xStart, yStart] = hookStartPos;
        // 不允许随机的钩子的范围
        const hooksArea = {
          pos: [xStart - HOOKS_AREA_ERROR, yStart],
          width: HOOKS_AREA_ERROR * 2,
          height: HOOKS_AREA_ERROR
        };
        if (this.judgePosIsInside([x, y], hooksArea)) {
          i--;
          continue;
        }

        // 5.0 检查随机生成的坐标以否在已生成的物品内
        let isOK = true;
        for (const c of result) {
          // 5.1 判断生成的坐标四个点都是否在区域内（避免物体重叠）
          const { width, height } = item;
          const posArr = [
            [x, y],
            [x + width, y],
            [x, y + height],
            [x + width, y + height]
          ];
          const bool_1 = this.judgePosIsInside(posArr[0], c);
          const bool_2 = this.judgePosIsInside(posArr[1], c);
          const bool_3 = this.judgePosIsInside(posArr[2], c);
          const bool_4 = this.judgePosIsInside(posArr[3], c);

          if (bool_1 || bool_2 || bool_3 || bool_4) {
            isOK = false;
            break;
          }
        }

        // 5.2 如果不满足则重新开始当次循环
        if (!isOK) {
          i--;
          continue;
        }

        // 6.0 成功随机到则加入到数组
        result.push(randomItems);
      }

      // 7.0 处理鲲的运动范围
      const lastArr = result.map(c => {
        // 不是鲲直接返回
        if (_.isUndefined(c.move)) return c;
        // 处理鲲
        const { area, pos } = c;
        const [x, y] = pos;
        // 取范围中间值
        const areaHalf = area / 2;
        // 判断随机的鲲往左移动是否会超过边界，超过则取可移动范围起点为0
        const moveStart = x - areaHalf > 0 ? x - areaHalf : 0;
        // 同上取最大移动范围为右边界
        const moveEnd = x + areaHalf < SVG_WIDTH ? x + areaHalf : SVG_WIDTH;
        return { ...c, moveArea: [moveStart, moveEnd] };
      });

      this.itemsList = lastArr;
    },

    /**
     * 判断随机生成的物品是否超过了边界
     * @param {object} items 被检查坐标
     * @returns {boolean}
     */
    judgeIsExceedBorder(items) {
      const {
        pos: [x, y],
        width,
        height
      } = items;
      //超出边界则返回false
      if (x + width > SVG_WIDTH || y + height > SVG_HEIGHT) {
        return true;
      }
      return false;
    },

    /**
     * 判断坐标是否在对象内
     * @param {array} pos 被检查坐标
     * @param {object} items 检查是否在内的对象区域属性
     * @returns {boolean}
     */
    judgePosIsInside(pos, items) {
      const [x1, y1] = pos;
      const {
        pos: [x2, y2],
        width,
        height
      } = items;
      // 如果传入坐标的x，大于等于目标区域的左边界且小于等于右边界
      // y大于等于目标区域的上边界且小于等于下边界
      // 同时满足时判定点在目标内
      if (x1 >= x2 && x1 <= x2 + width && y1 >= y2 && y1 <= y2 + height) {
        return true;
      }
      return false;
    },

    /**
     * 生成定时器，旋转钩子
     * @param {void}
     * @returns {void}
     */
    rotateHooks() {
      this.hookTimer = setInterval(() => {
        const { hookIsRotate, hookIsGrab, hookIsBack } = this;
        this.letKunIsMoving();

        // 1.0 计算钩子坐标
        this.computHooksPos();

        //2.0 当钩子处于旋转状态时
        if (hookIsRotate) {
          // 旋转时增加角度
          this.lineAngle += HOOKS_ROTATE_SPEED;
          return;
        }

        //3.0 当钩子处于正在抓取状态
        if (hookIsGrab) {
          // 3.1.1 当钩子抓到某物品后
          if (this.judgeHookIsCatch()) {
            // 3.1.2 设置钩子返回
            this.setHookStatus("hookSuccessBack");
            return;
          }

          // 3.2.1 当钩子接近边界时 设置钩子状态往回收
          if (this.judgeHookNearBorder()) {
            this.setHookStatus("hookFailBack");
            return;
          }

          this.lineLength += HOOK_CATCH_SPEED;
          return;
        }

        // 4.0 当钩子处于回收状态时
        if (hookIsBack) {
          this.drawLineIsShorten();
          // 4.1 抓到物品时使其跟随钩子
          if (this.isCatchItem) {
            this.hooksCatchSomething();
          }
          return;
        }
      }, 30);
    },

    /**
     * 让鲲动起来！
     * @param {void}
     * @returns {void}
     */
    letKunIsMoving() {
      const { itemsList } = this;

      const arr = itemsList.map(c => {
        // 跳过不是鲲的物品
        if (_.isUndefined(c.move)) return c;

        // 更新鲲的坐标
        const { move, moveArea, pos } = o;
        const [moveStart, moveEnd] = moveArea;
      });

      // for (const c of itemsList) {
      //   // 跳过不是鲲的物品
      //   if (_.isUndefined(c.move)) continue;

      // }

      // _.forEach(kunArr, o => {
      // 1.0 鲲移动
      // const { move, area, pos } = o;
      // pos[0] += move;
      // });
    },

    /**
     * 当钩子抓取到某物品时
     * @param {void}
     * @returns {void}
     */
    hooksCatchSomething() {
      const {
        hookPos: [x, y],
        itemsIdx
      } = this;
      const { width, height } = this.itemsList[itemsIdx];
      this.itemsList[itemsIdx].pos = [x - width / 2, y - height / 2];
    },

    /**
     * 判断钩子是否抓取到物品
     * @param {void}
     * @returns {boolean}
     */
    judgeHookIsCatch() {
      const { itemsList, hookPos } = this;
      // 1.0 遍历物品列表 判断钩子是否在任意一个物品中
      for (let i = 0; i < itemsList.length; i++) {
        const bool = this.judgePosIsInside(hookPos, itemsList[i]);
        if (bool) {
          // 3.0 设置已经抓取到 跳出遍历
          this.isCatchItem = true;
          this.itemsIdx = i;
          return true;
        }
      }
      return false;
    },

    /**
     * 判断钩子是否快接近边界
     * @param {void}
     * @returns {boolean}
     */
    judgeHookNearBorder() {
      const [x, y] = this.hookPos;

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
      const { itemsList, itemsIdx, isCatchItem } = this;
      // 抓取到获取当前物品的缩短速率
      if (isCatchItem) {
        const { weight } = itemsList[itemsIdx];
        this.lineLength -= weight * 0.1;
      } else {
        // 未抓到缩短速率
        this.lineLength -= DEFAULT_WEIGHT;
      }
      if (this.lineLength < LINE_DEFAULT_LENGTH) {
        // 恢复正常绳子长度
        this.lineLength = LINE_DEFAULT_LENGTH;
        // 计算得分 设置钩子恢复旋转
        this.calcScore();
        this.setHookStatus("startRotate");
      }
    },

    /**
     * 计算得分
     * @param {void}
     * @returns {void}
     */
    calcScore() {
      const { itemsIdx, itemsList } = this;
      const item = itemsList[itemsIdx];
      // 不存在时 为未抓到
      if (_.isEmpty(item)) return;
      const list = itemsList.filter((c, i) => i !== itemsIdx);
      this.itemsList = list;
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
        // 钩子旋转状态
        case "startRotate": {
          // 判断已经是旋转则避免重复设置 希望能小小优化一下吧
          if (this.hookIsRotate) return;
          this.hookIsRotate = true;
          this.hookIsGrab = false;
          this.hookIsBack = false;
          this.isCatchItem = false;
          this.itemsIdx = undefined;
          break;
        }

        // 钩子抓取状态
        case "startGrab": {
          if (this.hookIsGrab) return;
          this.hookIsRotate = false;
          this.hookIsGrab = true;
          this.hookIsBack = false;
          this.isCatchItem = false;
          this.itemsIdx = undefined;
          break;
        }

        // 钩子抓取成功返回
        case "hookSuccessBack": {
          if (this.hookIsBack) return;
          this.hookIsRotate = false;
          this.hookIsGrab = false;
          this.hookIsBack = true;
          this.isCatchItem = true;
        }

        // 钩子抓取失败返回
        case "hookFailBack": {
          if (this.hookIsBack) return;
          this.hookIsRotate = false;
          this.hookIsGrab = false;
          this.hookIsBack = true;
          this.isCatchItem = false;
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
    },

    /**
     * 处理关卡信息
     * @param {void}
     * @returns {array}
     */
    handleLevel() {
      const { LEVEL, 很多很多东西 } = GOLD;
      const { currentLevel } = this;
      const result = [];
      _.forEach(LEVEL[currentLevel - 1], (value, key) => {
        const item = 很多很多东西[key];
        for (let i = 0; i < value; i++) {
          result.push(item);
        }
      });
      return result;
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@style/gold.scss";
</style>
