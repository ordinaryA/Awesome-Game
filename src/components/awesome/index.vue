<template>
  <transition name="alanAlert">
    <div class="awe_back" v-if="cartoon.isShow" @click="hideThere">
      <img class="awe_img" :src="imgUrl" alt />
    </div>
  </transition>
</template>

<script>
import { mapState } from "vuex";
import { COMMIT } from "../../utils";
export default {
  data() {
    return {
      win: 7, // 胜利图片数量
      fail: 14, // 失败图片数量
    };
  },
  computed: {
    imgUrl() {
      const { type } = this.cartoon;
      if (type) {
        const ran = parseInt(Math.random() * (this[type] - 1) + 1);
        return require(`../../assets/img/winOrFail/${type}_${ran}.jpg`);
      }
    },
    ...mapState(["cartoon"]),
  },
  methods: {
    hideThere() {
      this.HiImg({ isShow: "hide" });
    },
  },
};
</script>

<style scoped>
.awe_back {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.7);
  user-select: none;
}
.awe_img {
  width: 300px;
  position: absolute;
  top: 17vh;
  left: 0;
  right: 0;
  margin: auto;
  user-select: none;
}
</style>