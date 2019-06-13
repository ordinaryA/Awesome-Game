<template>
    <div id="app">
        <router-view v-if="isRefresh" />
    </div>
</template>

<script>
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
    }
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}
</style>
