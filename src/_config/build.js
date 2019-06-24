import _ from "lodash";
import '@/assets/css/alan.css'
import 'animate.css';

// this上挂载的方法
import FUNCTION from "../utils/test";
const Install_Function = _Vue => {
  for (let I in FUNCTION) {
    _Vue.prototype[I] = FUNCTION[I];
  }
};

//自定义指令
import directive from '../utils/directive'
const Install_Command = _Vue => {
  //拖动
  for (let I in directive) {
    _Vue.directive(I, directive[I])
  }
};

export {
  Install_Function,
  Install_Command,
};
