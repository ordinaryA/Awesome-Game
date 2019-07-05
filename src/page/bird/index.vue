<template>
    <div class="bird_bg">
        <div
            class="paper bird_paper"
            v-first="{name:'translateRight',duration:'0.4s',delay:'0.5s',offset:'0'}"
        >
            <div
                class="spaceTip"
                v-first="{name:'translateRight',duration:'0.4s',delay:'0.7s',offset:'0'}"
            >空格键开始或跳跃（Space） 当前得分（Count）：{{successCount}} </div>
            <div
                class="game_layout"
                v-first="{name:'translateRight',duration:'0.4s',delay:'0.9s',offset:'0'}"
            >
                <div
                    class="bird_box"
                    ref="birdBox"
                >
                    <transition name="alanAlert">
                        <div
                            class="bird_h3"
                            v-if="!isStart"
                        >
                            <span v-first="{name:'translateTop',duration:'0.5s',delay:'1.4s',offset:'0'}">Game Start!!!</span><br>
                            <span v-first="{name:'translateTop',duration:'0.5s',delay:'1.6s',offset:'0'}">Just do it!Foolish guys!</span>
                        </div>
                    </transition>
                    <transition name="alanAlert">
                        <img
                            v-show="successTip.isShow"
                            :style="successAttr"
                            class="success_img"
                            src="../../assets/img/bird/success.png"
                            alt=""
                        >
                    </transition>
                    <div
                        :class="{'birdRoate':sports == 'fall','birdJump':sports == 'jump'}"
                        class="bird"
                        ref="bird"
                        :style="birdAttr"
                    >

                        <div class="birdWing"></div>
                    </div>
                    <div
                        class="pipFar"
                        v-for="(item,idx) in pipeArr"
                        :key="idx"
                        :style="{right:item.right + 'px'}"
                    >
                        <img
                            class="pipe"
                            :src="item.topPipeSrc"
                            :style="{top:item.topPipeTop + 'px'}"
                            alt=""
                        >
                        <img
                            class="pipe"
                            :src="item.bottomPipeSrc"
                            :style="{top:item.bottomPipeTop + 'px'}"
                            alt=""
                        >
                    </div>
                </div>
                <div
                    class="land"
                    v-first="{name:'alanAlertIn',duration:'0.5s',delay:'1.1s',offset:'0'}"
                ></div>
            </div>
        </div>
    </div>
</template>

<script>
import { $animate } from "../../mixins";
export default {
    mixins: [$animate],
    data() {
        return {
            birdData: {
                top: 50,
                right: 600
            }, //鸟对象
            AS: 500, //加速度
            TS: 0, //上抛速度
            sports: "null", //记录运动状态
            downTime: 0, //记录时间
            isStart: false, //是否开始
            timerNum: 20, //计时器时间
            moveTimer: null, //飞行计时器
            pipeArr: [], //管道的集合
            pipeDist: 100, //每组管道之间的距离
            pipeTimer: null, //管道定时器
            pipeDistance: 200, //每组管道之间间隔的距离
            successTip: {
                top: 210,
                right: 500,
                isShow: false
            }, //成功提示
            successCount: 0 //成功得分
        };
    },
    created() {
        this.bindSpaceKey();
    },
    destroyed() {
        clearInterval(this.pipeTimer);
        clearInterval(this.moveTimer);
    },
    computed: {
        birdAttr() {
            return {
                top: this.birdData.top + "px",
                right: this.birdData.right + "px"
            };
        },
        successAttr() {
            return {
                top: this.successTip.top + "px",
                right: this.successTip.right + "px"
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
                        this.gameRestart();
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
            this.TS = 200;
            //3.0 重新执行运动函数
            this.birdMove();
        },

        /**
         * 管道移动
         * @param {null}
         * @return {void}
         */
        pipeMove() {
            const { birdBox } = this.$refs;
            const { pipeArr, pipeDistance } = this;
            const birdWidth = birdBox.offsetWidth;
            clearInterval(this.pipeTimer);
            this.pipeTimer = setInterval(() => {
                //1.0 第一个管道超出边界则删除
                if (pipeArr[0].right > birdWidth) {
                    pipeArr.shift();
                }
                //2.0 最后一个管道距离右边界大于时则生成一组管道
                const lastPipe = pipeArr[pipeArr.length - 1];
                if (lastPipe.right > pipeDistance) {
                    this.createPipe();
                }
                //3.0 移动管道
                for (let i = 0; i < pipeArr.length; i++) {
                    const item = pipeArr[i];
                    item.right += 2;
                }
                //4.0 判断小鸟是否通过管道
                for (let i = 0; i < pipeArr.length; i++) {
                    const item = pipeArr[i];
                    //找到第一个当前正在通过的管道
                    if (item.isCross == "no") {
                        const res = this.judgeIsPassPipe(item);
                        switch (res) {
                            //成功通过
                            case "isSuccess":
                                this.passPipe();
                                item.isCross = "is";
                                break;
                            //失败了
                            case "isFail":
                                this.gameOver();
                                break;
                            //正在飞
                            case "isFlying":
                                break;
                        }
                        break;
                    }
                }
            }, 30);
        },

        /**
         * 判断小鸟是否通过管道
         * @param {object}
         * @return {string}
         */
        judgeIsPassPipe({ right, topPipeTop, bottomPipeTop }) {
            const { birdData } = this;
            const { top: birdtop, right: birdRight } = birdData;
            const pipeWidth = 52;
            const pipeHeight = 420;
            //1.0 先判断是否已经通过
            if (birdRight <= right) {
                return "isSuccess";
            }
            //2.0 未通过则判断当鸟进入管道的左右边界情况
            if (birdRight <= right + pipeWidth && birdRight > right) {
                //3.0 判断鸟是否触碰到上下边界或更多
                if (
                    birdtop <= topPipeTop + pipeHeight ||
                    birdtop >= bottomPipeTop
                ) {
                    return "isFail";
                }
            }
            return "isFlying";
        },

        /**
         * 判断小鸟是否通过管道
         * @param {null}
         * @return {void}
         */
        passPipe() {
            const { birdData } = this;
            this.successCount++;
            this.successTip = {
                top: birdData.top,
                right: birdData.right - 120,
                isShow: true
            };
            setTimeout(() => {
                this.successTip.isShow = false;
            }, 500);
        },

        /**
         * 判断小鸟是否通过管道
         * @param {null}
         * @return {void}
         */
        gameOver() {
            clearInterval(this.pipeTimer);
            clearInterval(this.moveTimer);
            this.isStart = false;
            this.downTime = 0;
            this.pipeArr = [];
            this.HiAlert({
                type: "danger",
                content: "你挂了"
            });
            this.HiImg({ type: "fail" });
        },

        /**
         * 游戏重新开始
         * @param {null}
         * @return {void}
         */
        gameRestart() {
            this.HiImg({ isShow: "hide" });
            this.createPipe();
            this.pipeMove();
            this.birdMove();
            this.isStart = true;
        },

        /**
         * 创造管道
         * @param {null}
         * @return {void}
         */
        createPipe() {
            const { pipeDist, pipeArr } = this;
            const { birdBox } = this.$refs;
            const birdHeight = birdBox.offsetHeight;
            const topH = ~~(Math.random() * (birdHeight - pipeDist - 50));
            //1.0 创造一组管道
            const initRight = 300; //管道离右边的初始距离
            const pipeW = 52; //管道图片宽度
            const pipeH = 420; //管道图片高度
            const pipe = {
                right: -pipeW,
                topPipeTop: topH - pipeH,
                topPipeSrc: require("../../assets/img/bird/pipeTop.png"),
                bottomPipeTop: topH + pipeDist,
                bottomPipeSrc: require("../../assets/img/bird/pipeBottom.png"),
                isCross: "no" //是否已被穿过
            };
            pipeArr.push(pipe);
        }
    }
};
</script>

<style scoped>
@import url("../../assets/css/bird");
</style>