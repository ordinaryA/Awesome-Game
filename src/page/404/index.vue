<template>
  <div class="fzf_content">
    <div class="containe_404 container-star">
      <div class="star-1" v-for="item in star1" :key="`star1-${item}`"></div>
      <div class="star-2" v-for="item in star2" :key="`star2-${item}`"></div>
    </div>
    <div class="containe_404 container-bird">
      <div class="bird bird-anim" v-for="item in birdCount" :key="item">
        <div class="bird-container">
          <div class="wing wing-left">
            <div class="wing-left-top"></div>
          </div>
          <div class="wing wing-right">
            <div class="wing-right-top"></div>
          </div>
        </div>
      </div>
      <div class="container-title">
        <div class="title">
          <div class="number">4</div>
          <div class="moon">
            <div class="face">
              <div class="mouth"></div>
              <div class="eyes">
                <div class="eye-left"></div>
                <div class="eye-right"></div>
              </div>
            </div>
          </div>
          <div class="number">4</div>
        </div>
        <div class="subtitle">哎呀。看来你拐错弯了。</div>
        <button @click="handleGOBack">返回</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      star1: 30, //星星1
      star2: 30, //星星2
      birdCount: 6, //鸟
    };
  },
  methods: {
    /**
     * 后退一步
     * @param {null}
     * @return {void}
     */
    handleGOBack() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "@style/404.scss";
</style>
