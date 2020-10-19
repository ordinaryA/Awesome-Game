<template>
  <div class="fix_contain" v-drag>
    <div
      class="which_one"
      v-for="(item, idx) in iconList"
      :key="idx"
      @click="toTarget(item)"
    >
      <svg class="fixed_icon" aria-hidden="true">
        <use :xlink:href="`#${item.icon}`" />
      </svg>
      <div class="fix_tip">{{ item.tip }}</div>
    </div>
  </div>
</template>

<script>
import { PUSH, PATH } from "../../utils";
export default {
  inject: ["reload"],
  data() {
    return {
      iconList: [
        { icon: "icon-juzuiniao", url: "/", tip: "小鸟" },
        { icon: "icon-leishen", url: "sweep", tip: "扫雷" },
        { icon: "icon-she", url: "snake", tip: "贪恰蛇" },
      ],
    };
  },
  methods: {
    /**
     * 点击导航跳转
     * @param {object}
     * @return {null}
     */
    toTarget({ url }) {
      document.onkeydown = null;
      if (url == PATH()) {
        this.reload();
      } else {
        PUSH(url);
      }
    },
  },
};
</script>

<style scoped>
.fix_contain {
  padding: 0px 10px;
  cursor: move;
  background: rgba(0, 0, 0, 0.7);
  position: fixed;
  top: 50px;
  left: 40px;
}
.which_one {
  margin: 20px 0;
}
.fixed_icon {
  width: 4em;
  height: 4em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
  transition: 0.3s;
  cursor: pointer;
}
.fixed_icon:hover {
  transform: scale(1.1);
}
.fix_tip {
  text-align: center;
  font-size: 12px;
  color: rgb(214, 196, 185);
}
</style>
