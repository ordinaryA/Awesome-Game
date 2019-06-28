<template>
    <div>
        <div class="fix_contain">
            <div
                v-for="(item,idx) in iconList"
                :key="idx"
                @click="toTarget(item)"
            >
                <svg
                    class="fixed_icon"
                    aria-hidden="true"
                >
                    <use :xlink:href="`#${item.icon}`"></use>
                </svg>
            </div>
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
                { icon: "icon-she", url: "/" },
                { icon: "icon-leishen", url: "sweep" }
            ]
        };
    },
    methods: {
        /**
         * 点击导航跳转
         * @param {object}
         * @return {null}
         */
        toTarget({ url }) {
            if (url == PATH()) {
                this.reload();
            } else {
                PUSH(url);
            }
        }
    }
};
</script>

<style scoped>
.fixed_icon {
    width: 6em;
    height: 6em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
    transition: 0.3s;
}
.fixed_icon:hover {
    transform: scale(1.1);
}
.fix_contain {
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    top: 50px;
    left: 40px;
}
</style>