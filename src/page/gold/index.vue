<template>
  <div class="gold_bg">
    <div class="w1440 noScroll">
      <div class="row site">
        <div class="sm-12 md-12 col">
          <div
            class="paper"
            v-first="{name:'translateRight',duration:'0.4s',delay:'0.5s',offset:'0'}"
          >
            <div class="wohu"></div>
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
    return {};
  },
  computed: {},
  methods: {}
};
</script>

<style scoped>
@import url("../../assets/css/gold.scss");
</style>