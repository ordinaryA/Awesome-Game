<template>
  <div class="alert_box">
    <transition-group name="alanAlert">
      <div class="alert_style" v-for="item in alertQueue" :key="item.alertId">
        <div :class="`alert alert-${item.type}`">{{ item.content }}</div>
        <!-- Alert-primary
            Alert-secondary
            Alert-success
            Alert-warning
        Alert-danger-->
      </div>
    </transition-group>
  </div>
</template>

<script>
import { COMMIT } from "../../utils";
import { mapState } from "vuex";
export default {
  computed: {
    ...mapState(["alertQueue"]),
  },
};
</script>

<style scoped>
/* .alert_box {
    position: fixed;
    width: 500px;
    top: 5vh;
    left: 0;
    right: 0;
    margin: auto;
} */
.alert_style {
  width: 500px;
  position: fixed;
  top: 10vh;
  left: 0;
  right: 0;
  margin: auto;
  z-index: 1;
}
</style>