import '@/assets/css/alan.css';
import '@/assets/css/paper.css';
import 'animate.css';

// this上挂载的方法
import FUNCTION from "../utils/test";

//自定义指令
import directive from '../utils/directive';
const InstallFunction = _Vue => {
  for (const I in FUNCTION) {
    _Vue.prototype[I] = FUNCTION[I];
  }
}; ;
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
