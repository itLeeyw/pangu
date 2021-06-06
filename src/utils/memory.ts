import { NATIVE_TYPE } from '../configs/configs';
/** 深克隆
 * 
 * @param O 
 * @returns 
 */
function deepClone(O: any): object {
  const toStr = Object.prototype.toString;
  if (toStr.call(O) === NATIVE_TYPE.undefined) return O;
  if (toStr.call(O) === NATIVE_TYPE.null) return O;
  if (toStr.call(O) === NATIVE_TYPE.date) return new Date(O);
  if (toStr.call(O) === NATIVE_TYPE.regexp) return new RegExp(O);
  if (toStr.call(O) !== NATIVE_TYPE.object) return O;

  let target = new O.constructor();
  for (let k in O) {
    if ((O as {}).hasOwnProperty(k)) {
      target[k] = deepClone(O[k]);
    }
  }
  return target;
}

export {
  deepClone
}