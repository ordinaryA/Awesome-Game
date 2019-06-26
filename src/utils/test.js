import {
  COMMIT
} from './index'

/**
 * 简陋深拷贝（无法拷贝函数）
 * @param {object}
 * @return {object}
 */
const Deep = obj => JSON.parse(JSON.stringify(obj));

/**
 * 获取客户端当前时间戳(秒)
 * @param {null}
 * @return {number}
 */

const current = () => Number(new Date()) / 1000;

/**
 * 封装后alert方法
 * @param {object}
 * @return {void}
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
  Deep,
  current,
  HiAlert,
}

export default FUNCTION;
