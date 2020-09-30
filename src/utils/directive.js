/**
 * 拖动指令
 * @param {null}
 * @return {void}
 */
const drag = {
  inserted(el, binding) {
    const oDiv = el;
    oDiv.onmousedown = function (e) {
      //鼠标按下，计算当前元素距离可视区的距离
      const disX = e.clientX - oDiv.offsetLeft;
      const disY = e.clientY - oDiv.offsetTop;
      document.onmousemove = function (e) {
        //获取到鼠标拖拽后的横向位移(距离父级元素)
        const l = e.clientX - disX;
        //获取到鼠标拖拽后的纵向位移(距离父级元素)
        const t = e.clientY - disY;
        oDiv.style.left = l + "px";
        oDiv.style.top = t + "px";
      };
      //松开事件后，移除事件
      document.onmouseup = function (e) {
        document.onmousemove = null;
        document.onmouseup = null;
      };
    };
  }
};

/**
 * 初次加载动画指令
 * duration:动画持续时间 delay:动画延迟时间 offset:距离底部距离开始动画
 * @param {object}
 * @return {void}
 */
const first = {
  bind(el, binding) {
    const attr = binding.value;
    el.className += ' wow';
    for (const key in attr) {
      if (key == 'name') {
        el.className += ` ${attr[key]}`;
      } else {
        el.setAttribute(`data-wow-${key}`, attr[key]);
      }
    }
  }
};

const directive = {
  drag,
  first,
};

export default directive;
