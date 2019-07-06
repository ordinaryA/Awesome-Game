# 用Vue写点游戏玩玩~~~

![awesome](https://github.com/ordinaryA/Awesome-Game/blob/master/supply/mai.jpg)

## 在线Demo
- 管道小鸟 ：[在线试玩](http://www.almx.top/awesome/#/)
- 贪吃蛇 ：[在线试玩](http://www.almx.top/awesome/#/snack)
- 扫雷 ：[在线试玩](http://www.almx.top/awesome/#/sweep)
![awesome](https://github.com/ordinaryA/Awesome-Game/blob/master/supply/birdDemo.png)
## 鸟对象与管道集合
```
bird = {
         top, //鸟的top值
         right, //鸟的right值
         sports, //记录运动状态来更改跳跃和下坠动画
       }
pipe = {
         right, //管道的right值
         topPipeTop, //上管道的top值
         topPipeSrc, 上管道的资源地址
         bottomPipeTop, //下管道的top值
         bottomPipeSrc, //下管道的资源地址
         isCross, //管道是否已被小鸟通过
       }; 
```
## 思考
我认为比较关键的点：
- 管道边界的判断问题
- 遍历管道集合时，当最后一项距离右边界一定距离则```push```一个管道对象，```unshift```掉首项
- 当小鸟通过一组上下管道后，则该对象新增记录，遍历时存在则跳过
![awesome](https://github.com/ordinaryA/Awesome-Game/blob/master/supply/snackDemo.png)
![awesome](https://github.com/ordinaryA/Awesome-Game/blob/master/supply/sweepDemo.png)
