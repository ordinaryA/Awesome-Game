# 用Vue写点游戏玩玩~~~（会持续更新）

![awesome](http://www.almx.top/image/awesome-game/mai.jpg)

### 求个赞
>掘金地址：[https://juejin.im/post/5d22b3ade51d4577770e73f1](https://juejin.im/post/5d22b3ade51d4577770e73f1)
  

## 在线Demo
- 扫雷 ：[在线试玩](http://www.almx.top/awesome/#/sweep)
- 管道小鸟 ：[在线试玩](http://www.almx.top/awesome/#/)
- 贪吃蛇 ：[在线试玩](http://www.almx.top/awesome/#/snake)

# 扫雷

![awesome](http://www.almx.top/image/awesome-game/sweepDemo.png)
## 思路
1. 棋盘的每个格子分为三种类型的其中一种：
>- 雷：emmm 就是一颗雷
>- 数字：以当前格为中心的九宫格内雷的数量
>- 空白：以当前格为中心的九宫格内没有雷
2. 当点击某个格子的时候有对应以上三种类型的三种情况：
>- 雷：emmmm 游戏结束
>- 数字：显示当前数字，提示用户雷的数量
>- 空白：需要以当前点击格子为中心向外递归寻找类型为数字的格子来停止递归，如图

![awesome](http://www.almx.top/image/awesome-game/sweep_ex1.png)

## 递归
1. 假设点击空白格的坐标``` [x,y] ```，则以它为中心的另八个格子坐标为：
``` javascript
            const arr = [
                //获取九宫格数据
                [x - 1, y - 1], //左上
                [x, y - 1], //中上
                [x + 1, y - 1], //右上
                [x - 1, y], //中左
                [x + 1, y], //中右
                [x - 1, y + 1], //左下
                [x, y + 1], //中下
                [x + 1, y + 1] //右下
            ];
```
2. 过滤掉边界外的坐标，获得以坐标为集合的二维数组：
``` javascript
            const [maxX, maxY] = this.boardSize; //棋盘的边界值
            const filterArr = arr.filter(
                ([posX, posY]) =>
                    !(posX < 0 || posY < 0 || posX >= maxX || posY >= maxY)
            );
```
3. 遍历坐标的集合，再去获取以每一项为中心的另八个坐标的集合，进行递归;
![awesome](http://www.almx.top/image/awesome-game/sweep_ex2.png)
4. 当递归的途中某个坐标的类型不为空白，为数字时，则停止递归，如下图:
![awesome](http://www.almx.top/image/awesome-game/sweep_ex3.png)
>点击红色向外遍历 => 紫色箭头 => 绿色箭头（找到数字格）=> 跳过绿色箭头的递归 => 开始黑色箭头的递归 
5. 为避免递归的过程中重复递归某一坐标，则给每个棋格对象添加是否递归过的布尔值，通过判断则可避免重复递归
6. 最后会得到扩展开的边界都为数字格的棋盘；

![awesome](http://www.almx.top/image/awesome-game/sweep_ex4.png)
>emmmm 不要在意画风。

## 旗子
1. 需要给所有雷类型的格子插上旗子来获得胜利
2. 点击数字格子时判断九宫格内的旗子是否正确排雷
>- 只有当旗子数量大于或等于点击格的数字时才判断
>- 旗子误插时则分别显示三种状态：
>>正确的雷（正常显示）
>>排掉的雷（绿色背景的雷）
>>错排的雷（红色背景的雷）

![awesome](http://www.almx.top/image/awesome-game/sweep_ex5.png)

## 完成！

# 管道小鸟

![awesome](http://www.almx.top/image/awesome-game/birdDemo.png)
## 鸟对象与管道集合
``` javascript
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
## 比较关键的点：
- 鸟的下落速度与上抛速度 （表示已经全部还给了物理老师 特意去网上查了查公式 (┬＿┬)）
- 遍历管道集合时，当最后一项距离右边界一定距离则``` push ```一个管道对象，``` unshift ```掉首项
- 当小鸟通过一组上下管道后，则该对象新增记录，遍历时存在则跳过
- 边界值的判断与误差值

### 管道的边界判断
>当小鸟通过管道时存在三种状态
- 飞往管道的途中或正在管道中飞行
- 失败
- 成功<br>
当小鸟成功飞过管道时，记录当前管道的``` isCross ```字段，已被小鸟通过。

### 完成
>接下来就好办了，写一个动画让背景和小鸟动起来，设置定时器让管道动起来，一切就完成啦！

# 贪恰蛇

![awesome](http://www.almx.top/image/awesome-game/snackDemo.png)
## 生成一条贪吃的蛇 🐍与它的食物 🎂
>首先需要定义一个二维数组来存放蛇头与蛇身的坐标
- 蛇头：``` [~~(Math.random() * (棋盘宽度 - 蛇长 - 1) + 1),~~(Math.random() * (棋盘高度 - 蛇长 - 1) + 1)]; ```
- 蛇身：通过蛇头的坐标随机向上或向下遍历坐标可得到
- 蛇的数据结构：最终得到类似右边的二维数组 ``` [[10,10],[10,11],[10,12],[10,13],[10,14]]```
- 食物： 通过``` while ```遍历出一个不属于🐍身的坐标就好了

## 让蛇动起来 🐍
>根据移动的方向使蛇的首项的当前轴坐标+1，并删除蛇集合的尾项，蛇就动起来啦！我们需要：
1. 绑定键盘事件，当用户按下时设置蛇移动的方向;
2. 通过遍历去判断蛇头是否存在边界问题或蛇身;
3. 判断蛇头坐标是否与食物坐标重合;
4. 当蛇'吃到'食物时，则不删除蛇的尾项;

## 大功告成
>接下来可以给贪吃蛇🐍加上一些因(花)吹(里)斯(胡)汀(哨)的功能了！


