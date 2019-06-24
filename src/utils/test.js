import {
  COMMIT
} from './index'

/**
 * //测试代码运行时间（未完善）
 * @param {object}
 * @return {string}
 */
const X = async (func1, func2, func3) => {
  const d = new Date();
  await (function () {
    func1 && func1();
    func2 && func2();
    func3 && func3();
  })();
  const r = new Date();

  return
};

/**
 * 简陋深拷贝（无法拷贝函数）
 * @param {object}
 * @return {object}
 */
const Deep = obj => JSON.parse(JSON.stringify(obj));


/**
 * 返回一个纯数字的数组
 * @param {number}
 * @return {array}
 */
const wannaArray = number => {
  const res = [];
  for (let i = 0; i < number; i++) {
    res.push(i);
  }
  return res
}

/**
 * 获取当前时间戳(秒)
 * @param {null}
 * @return {number}
 */

const current = () => Number(new Date()) / 1000;

/**
 * 封装后alert方法
 * @param {object}
 * @return {null}
 * @item 
 */
const HiAlert = item => {
  COMMIT('handleAlert', item)
  /*
    item = {
      type: 'primary', //主要的 primary 次要的 secondary 成功的 success 警告 warning 危险 danger
      content: '', //内容
      clear: false, //true:只显示一个弹窗 false:显示多个弹窗
    }
  */
}


const FUNCTION = {
  X,
  Deep,
  wannaArray,
  current,
  HiAlert,
}

export default FUNCTION;
