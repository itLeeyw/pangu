import { NATIVE_TYPE } from '../configs/configs';
function deepClone<T>(O: T, t?: any): T { // 暂时使用 any 代替... todo 改造接口 ---> 类
  let target = t ? t : {};
  const toStr = Object.prototype.toString;
  for (let k in O) {
    if ((O as {}).hasOwnProperty(k)) {
      if (toStr.call(O[k]) === NATIVE_TYPE.object) deepClone(O[k]);

      target[k] = O[k];
    }
  }
  return target;
}

export {
  deepClone
}