import '@style/alan.css';
import '@style/paper.css';
// 使用wow下的animate css 解决延迟BUG
// import 'animate.css';
import 'wowjs/css/libs/animate.css';

// this上挂载的方法
import FUNCTION from "../utils/test";

import directive from '../utils/directive';
const InstallFunction = _Vue => {
  for (const I in FUNCTION) {
    _Vue.prototype[I] = FUNCTION[I];
  }
};

//自定义指令
const InstallCommand = _Vue => {
  //拖动
  for (const I in directive) {
    _Vue.directive(I, directive[I]);
  }
};

export {
  InstallFunction,
  InstallCommand
};
