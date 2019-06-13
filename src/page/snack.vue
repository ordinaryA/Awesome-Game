<template>
    <div>
        <div class="btn_contain">
            <button
                class="ch_btn"
                @click="restart"
            >重新开始</button>
        </div>
        <div class="content">
            <div
                class="layout"
                ref="layout"
            >
                <ul
                    class="check_ul cl"
                    v-for="(col,cIdx) in formattCheck"
                    :key="cIdx"
                >
                    <li
                        v-for="(row,rIdx) in col"
                        :key="rIdx"
                        :style="liStyle"
                        :ref="`li_${cIdx}`"
                    ></li>
                </ul>
            </div>
            <transition name="alan_scale">
                <div
                    class="stop"
                    v-show="isStop"
                >
                    <img
                        src="../assets/img/stop.png"
                        alt=""
                    >
                </div>
            </transition>
        </div>
    </div>
</template>

<script>
export default {
    inject: ["reload"],
    data() {
        return {
            checkerArea: [50, 50], //棋盘横纵格子数
            liStyle: {}, //棋盘样式
            snackLength: 4, //蛇的初始长度
            snack: [], //蛇的容器
            food: [], //食物的坐标
            direction: undefined, //移动方向
            moveTimer: undefined, //蛇移动的定时器
            isStop: true, //是否暂停
            wait: true //等待方向更改完成才能再次修改方向
        };
    },
    computed: {
        /**
         * return 二维数组
         */
        formattCheck() {
            const [a, b] = this.checkerArea;
            const res = [];
            for (let i = 0; i < a; i++) {
                const arr = [];
                for (let n = 0; n < b; n++) {
                    arr[n] = n;
                }
                res[i] = arr;
            }
            return res;
        }
    },
    created() {
        //1.0 生成蛇的二维数组
        this.createSnack();
        this.$nextTick(() => {
            //2.0 初始化棋盘样式
            this.initStyle();
            //3.0 画出一条蛇
            this.drawSnack();
            //4.0 随机生成食物
            this.createFood();
            //5.0 绑定键盘事件
            this.bindKeycode();
        });
    },
    destroyed() {
        clearInterval(this.moveTimer);
    },
    methods: {
        /**
         * 重新开始
         * @param {null}
         * @return {void}
         */
        restart() {
            this.reload();
        },

        /**
         * 游戏开始
         * @param {null}
         * @return {void}
         */
        gameStart() {
            clearInterval(this.moveTimer);
            this.moveTimer = setInterval(() => {
                this.snackMove();
                this.wait = true;
            }, 200);
        },

        /**
         * 按键改变方向
         * @param {null}
         * @return {void}
         */
        bindKeycode() {
            document.onkeydown = ({ keyCode }) => {
                const { direction, isStop, wait } = this;
                //1.0 不等于相反方向时按键改变蛇的方向
                switch (keyCode) {
                    //左
                    case 37:
                        if (direction != "right" && wait) {
                            this.direction = "left";
                            this.wait = false;
                        }
                        break;
                    //上
                    case 38:
                        if (direction != "down" && wait) {
                            this.direction = "up";
                            this.wait = false;
                        }
                        break;
                    //右
                    case 39:
                        if (direction != "left" && wait) {
                            this.direction = "right";
                            this.wait = false;
                        }
                        break;
                    //下
                    case 40:
                        if (direction != "up" && wait) {
                            this.direction = "down";
                            this.wait = false;
                        }
                        break;
                    //空格
                    case 32:
                        if (!isStop) {
                            clearInterval(this.moveTimer);
                        } else {
                            this.gameStart();
                        }
                        this.isStop = !isStop;
                        break;
                }
            };
        },

        /**
         * 移动一条蛇
         * @param {null}
         * @return {void}
         */
        snackMove() {
            const { direction, snack } = this;
            let [r, c] = snack[0]; //第r行的第c个
            let headAfter = [];
            switch (direction) {
                case "up":
                    headAfter = [(r -= 1), c];
                    break;
                case "down":
                    headAfter = [(r += 1), c];
                    break;
                case "left":
                    headAfter = [r, (c -= 1)];
                    break;
                case "right":
                    headAfter = [r, (c += 1)];
                    break;
            }
            if (headAfter[0] < 0 || headAfter[1] < 0) {
                clearInterval(this.moveTimer);
                alert("游戏结束");
                this.reload();
                return;
            }
            if (this.isAteFood()) {
                //吃到食物则重新生成一个食物
                this.createFood();
            } else {
                //未到食物则删除获取最后一个元素坐标
                const [row, col] = snack.pop();
                const li = this.$refs[`li_${row}`][col];
                li.className = "";
            }
            snack.unshift(headAfter);
            this.drawSnack();
        },

        /**
         * 判断是否吃到了食物
         * @param {null}
         * @return {void}
         */
        isAteFood() {
            const [foodRow, foodCol] = this.food;
            const [headRow, headCol] = this.snack[0];
            if (foodRow == headRow && foodCol == headCol) {
                return true;
            } else {
                return false;
            }
        },

        /**
         * 创建一条蛇
         * @param {null}
         * @return {void}
         */
        createSnack() {
            const {
                snackLength: l,
                checkerArea: [r, c]
            } = this;
            //1.0 避免随机头部在边界且容的下蛇的长度
            const row = parseInt(Math.random() * (r - l - 1) + 1);
            const col = parseInt(Math.random() * (c - l - 1) + 1);
            //2.0 头部坐标
            const head = [row, col];
            const body = [];
            //3.0 随机生成蛇
            const ran = Math.random();
            if (ran > 0.5) {
                for (let i = row + 1; i < row + l; i++) {
                    body.push([i, col]);
                    //4.0 定义蛇移动的方向
                    this.direction = "left";
                }
            } else {
                for (let i = col + 1; i < col + l; i++) {
                    body.push([row, i]);
                    this.direction = "up";
                }
            }
            this.snack = [head, ...body];
        },

        /**
         * 创建一条蛇
         * @param {null}
         * @return {void}
         */
        drawSnack() {
            const { snack } = this;
            //1.0 解构 a:横轴坐标 b:纵轴坐标
            snack.map(([a, b], idx) => {
                //2.0 根据坐标获取元素
                const li = this.$refs[`li_${a}`][b];
                if (idx == 0) {
                    li.className = "snack_head";
                } else {
                    li.className = "snack_body";
                }
            });
        },

        /**
         * 创建一个食物
         * @param {null}
         * @return {void}
         */
        createFood() {
            const {
                checkerArea: [x, y],
                snack
            } = this;
            //1.0 食物的坐标与蛇重叠则重新随机
            while (true) {
                const row = Math.floor(Math.random() * x);
                const col = Math.floor(Math.random() * y);
                for (let i = 0; i < snack.length; i++) {
                    const [a, b] = snack[i];
                    if (row != a && col != b) {
                        this.food = [row, col];
                        //2.0 修改食物坐标样式
                        const food = this.$refs[`li_${row}`][col];
                        food.className = "food";
                        return;
                    }
                }
            }
        },

        /**
         * 初始化棋盘样式
         * @param {null}
         * @return {void}
         */
        initStyle() {
            const { layout } = this.$refs,
                { offsetWidth, offsetHeight } = layout,
                [a, b] = this.checkerArea,
                w = parseInt(offsetWidth / b) + "px",
                h = parseInt(offsetHeight / a) + "px";
            this.liStyle = { width: w, height: h };
        }
    }
};
</script>

<style scoped>
.content {
    position: relative;
    margin: 20px auto;
}
.content,
.layout,
.stop {
    width: 708px;
    height: 708px;
}
.layout {
    border: 4px solid #666;
}
.stop {
    background: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
}
.stop img {
    width: 30%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}
.check_ul li {
    float: left;
    /* border: 1px solid #666; */
}
.snack_head {
    background: rgb(211, 218, 206);
}
.snack_body {
    background: rgb(170, 163, 163);
}
.food {
    background: rgb(218, 153, 153);
}
.btn_contain {
    width: 700px;
    text-align: center;
    margin: 60px auto 0;
}
.alan_scale-enter-active {
    animation: alan_scale 0.3s;
}

.alan_scale-leave-active {
    animation: alan_scale 0.3s reverse;
}

@keyframes alan_scale {
    0% {
        transform: scale(1.05);
        opacity: 0;
    }
    100% {
        transform: scale(1);
        opacity: 1;
    }
}
</style>