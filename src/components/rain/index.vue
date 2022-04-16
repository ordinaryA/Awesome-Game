<template>
  <div>
    <div class="rain" ref="rain"></div>
    <span
      class="rain--item"
      v-for="(item, idx) in rains"
      :key="idx"
      :style="{ top: `${item.top}px`, left: item.left }"
    ></span>
  </div>
</template>

<script>
// 生成雨滴速度
const CREAT_RAIN_SPACE_TIME = 50;
// 雨滴下落速度
const RAIN_RACE_TIME = 20;

export default {
  data() {
    return {
      rains: [],
      rainTimer: null,
      raceTimer: null,
      maxHeight: 0,
    };
  },
  created() {
    this.initialRains();
    this.initialRace();
    this.$nextTick(() => {
      this.maxHeight = this.$refs.rain.clientHeight;
    });
  },
  methods: {
    initialRains() {
      this.rainTimer = setInterval(() => {
        const rainItem = {
          top: -50,
          left: `${~~(Math.random() * 100)}%`,
          speed: 0,
        };
        this.rains = [...this.rains, rainItem];
      }, CREAT_RAIN_SPACE_TIME);
    },
    initialRace() {
      this.raceTimer = setInterval(() => {
        const { rains } = this;
        const result = rains.reduce((p, c) => {
          if (c.top >= this.maxHeight) return p;
          return [...p, { ...c, top: c.top + c.speed, speed: c.speed + 1 }];
        }, []);
        this.rains = result;
      }, RAIN_RACE_TIME);
    },
  },
  destroyed() {
    clearInterval(this.rainTimer);
    clearInterval(this.raceTimer);
    this.rainTimer = null;
    this.raceTimer = null;
  },
};
</script>

<style lang="scss" scoped>
.rain {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  pointer-events: none;
  background: url("./img/rain-bg.jpg") no-repeat center;
  background-size: cover;

  &--item {
    // position: absolute;
    position: fixed;
    display: inline-block;
    width: 2px;
    height: 60px;
    background: linear-gradient(
      rgba(255, 255, 255, 0.3),
      rgba(255, 255, 255, 0.6)
    );
    z-index: 9999;
  }
}
</style>