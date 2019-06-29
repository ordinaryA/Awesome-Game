<template>
    <div id="app">
        <router-view v-if="isRefresh" />
        <!-- 弹框 -->
        <Alert />
        <!-- 暴走漫画 -->
        <Awesome />
        <!-- 侧边条 -->
        <Fixed />
    </div>
</template>

<script>
import Alert from "./components/alert";
import Awesome from "./components/awesome";
import Fixed from "./components/fixed";
import { mapState } from "vuex";
export default {
    name: "App",
    data() {
        return {
            isRefresh: true
        };
    },
    provide() {
        return {
            reload: this.reload
        };
    },
    methods: {
        /**
         * @param {null}
         * @return {void}
         */
        reload() {
            this.isRefresh = false;
            this.$nextTick(() => (this.isRefresh = true));
        }
    },
    components: {
        Alert,
        Awesome,
        Fixed
    }
};
</script>

<style>
</style>
