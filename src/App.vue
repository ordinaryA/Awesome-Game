<template>
    <div id="app">
        <router-view v-if="isRefresh" />
        <Alert />
    </div>
</template>

<script>
import Alert from "./components/alert";
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
        Alert
    }
};
</script>

<style>
</style>
