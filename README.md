# 用Vue写点游戏玩玩~~~

![awesome](https://github.com/ordinaryA/Awesome-Game/blob/master/supply/mai.jpg)

## 在线Demo
- 管道小鸟 ：[在线试玩](http://www.almx.top/awesome/#/)
- 贪吃蛇 ：[在线试玩](http://www.almx.top/awesome/#/snack)
- 扫雷 ：[在线试玩](http://www.almx.top/awesome/#/sweep)
![awesome](https://github.com/ordinaryA/Awesome-Game/blob/master/supply/birdDemo.png)
## 鸟对象与管道集合
```
const bird = {
               top, //鸟的top值
               right, //鸟的right值
               sports, //记录运动状态来更改跳跃和下坠动画
             };
             
const pipe = {
               right, //管道的right值
               topPipeTop, //上管道的top值
               topPipeSrc, 上管道的资源地址
               bottomPipeTop, //下管道的top值
               bottomPipeSrc, //下管道的资源地址
               isCross, //管道是否已被小鸟通过
             }; 
```
## 我认为比较关键的点：
- 鸟的下落速度与上抛速度 （表示已经全部还给了物理老师 特意去网上查了查公式 (┬＿┬)）
- 遍历管道集合时，当最后一项距离右边界一定距离则```push```一个管道对象，```unshift```掉首项
- 当小鸟通过一组上下管道后，则该对象新增记录，遍历时存在则跳过
- 边界值的判断与误差值

### 管道的边界判断
>当小鸟通过管道时存在三种状态
- 飞往管道的途中或正在管道中飞行
- 失败
- 成功<br>
当小鸟成功飞过管道时，记录当前管道的```isCross```字段，已被小鸟通过。

### 完成
>接下来就好办了，写一个动画让背景和小鸟动起来，设置定时器让管道动起来，一切就完成啦！

![awesome](https://github.com/ordinaryA/Awesome-Game/blob/master/supply/snackDemo.png)
## 生成一条贪吃的蛇 🐍与它的食物 🎂
>我们需要定义一个二维数组来存放蛇头与蛇身的坐标
- 蛇头：```[~~(Math.random() * (棋盘宽度 - 蛇长 - 1) + 1),~~(Math.random() * (棋盘高度 - 蛇长 - 1) + 1)];```
- 蛇身：通过蛇头的坐标随机向上或向下遍历坐标可得到
- 蛇的数据结构：最终得到类似右边的二维数组 ```[[10,10],[10,11],[10,12],[10,13],[10,14]]```
- 食物： 通过```while```遍历出一个不属于🐍身的坐标就好了

## 让蛇动起来 🐍
>根据移动的方向使蛇的首项的当前轴坐标+1，并删除蛇集合的尾项，蛇就动起来啦！我们需要：
1. 绑定键盘事件，当用户按下时设置蛇移动的方向;
2. 通过遍历去判断蛇头是否存在边界问题或蛇身;
3. 判断蛇头坐标是否与食物坐标重合;
4. 当蛇'吃到'食物时，则不删除蛇的尾项;

## 大功告成
>接下来我们可以给贪吃蛇🐍加上一些因(花)吹(里)斯(胡)汀(哨)的功能！（由于笔者实在太懒，贪吃蛇目前已经没有维护了。。。）

![awesome](https://github.com/ordinaryA/Awesome-Game/blob/master/supply/sweepDemo.png)
## 思路
1. 棋盘的每个格子分为三种类型的其中一种：
>- 雷：emmm 就是一颗雷
>- 数字：以当前格为中心的九宫格内雷的数量
>- 空白：以当前格为中心的九宫格内没有雷
2. 当我们点击某个格子的时候有对应以上三种类型的三种情况：
>- 雷：emmmm 游戏结束
>- 数字：显示当前数字，提示用户雷的数量
>- 空白：我们需要以当前点击格子为中心向外递归寻找类型为数字的格子来停止递归，如图

