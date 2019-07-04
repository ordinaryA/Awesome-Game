<template>
    <div>
        <div
            class="bird_box"
            ref="birdBox"
        >
            <div
                :class="{'birdRoate':sports == 'fall','birdJump':sports == 'jump'}"
                class="bird"
                ref="bird"
                :style="birdAttr"
            >
                <div class="birdWing"></div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            birdData: {
                top: 80,
                left: 120
            }, //鸟对象
            AS: 500, //加速度
            TS: 0, //上抛速度
            sports: "null", //记录运动状态
            downTime: 0, //记录时间
            isStart: false, //是否开始
            timerNum: 20, //计时器时间
            moveTimer: null //飞行计时器
        };
    },
    created() {
        this.bindSpaceKey();
    },
    computed: {
        birdAttr() {
            return {
                top: this.birdData.top + "px",
                left: this.birdData.left + "px"
            };
        }
    },
    methods: {
        /**
         * 绑定空格键
         * @param {null}
         * @return {void}
         */
        bindSpaceKey() {
            document.onkeydown = ({ keyCode }) => {
                const { isStart } = this;
                if (keyCode == 32) {
                    //1.0 未开始则执行开始函数
                    if (!isStart) {
                        this.isStart = true;
                        this.birdMove();
                    } else {
                        //2.0 开始则执行跳跃函数
                        this.birdJump();
                    }
                }
            };
        },

        /**
         * 开始运动
         * @param {null}
         * @return {void}
         */
        birdMove() {
            let { timerNum, birdData, TS, AS } = this;
            clearInterval(this.moveTimer);
            //1.0 获取初始化top值
            const lastTop = birdData.top;
            this.moveTimer = setInterval(() => {
                //2.0 时间单位转换为秒
                this.downTime += timerNum / 1000;
                const { downTime } = this;
                //3.0 上一次跳跃的距离 + 当前产生的位移 (下落距离 -上抛距离 )
                const currentTop =
                    0.5 * AS * downTime * downTime - TS * downTime;
                const AH = lastTop + currentTop;
                if (AH > lastTop) {
                    if (this.sports != "fall") this.sports = "fall";
                } else {
                    if (this.sports != "jump") this.sports = "jump";
                }
                //4.0 判断底边界
                const { birdBox, bird } = this.$refs;
                const bottomBorder = birdBox.offsetHeight;
                const birdHeight = bird.offsetHeight;
                if (AH > bottomBorder) {
                    birdData.top = bottomBorder - birdHeight;
                    clearInterval(this.moveTimer);
                } else {
                    birdData.top = AH;
                }
            }, timerNum);
        },

        /**
         * 跳跃
         * @param {null}
         * @return {void}
         */
        birdJump() {
            //1.0 初始化记录的下落时间
            this.downTime = 0;
            //2.0 设置上抛速度
            this.TS = 100;
            //3.0 重新执行运动函数
            this.birdMove();
        }
    }
};
</script>

<style scoped>
@import url("../../assets/css/bird");
</style>