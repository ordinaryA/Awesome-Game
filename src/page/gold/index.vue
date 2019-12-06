<template>
  <div class="bird_bg">
    <div class="w1440 noScroll">
      <div class="row site">
        <div class="sm-12 md-12 col">
          <div
            class="paper"
            v-first="{name:'translateRight',duration:'0.4s',delay:'0.5s',offset:'0'}"
          >111111111111111</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";
import { sidebar } from "../../const/bird";
import { $animate } from "../../mixins";
import { COMMIT } from "../../utils";
export default {
  mixins: [$animate],
  data() {
    return {
      // sidebar
    };
  },
  computed: {},
  methods: {
    /**
     * 侧边栏事件
     * @param {object}
     * @return {void}
     */
    sideBarMethod(item) {}
  }
};
</script>

<style scoped>
@import url("../../assets/css/gold.scss");
</style>