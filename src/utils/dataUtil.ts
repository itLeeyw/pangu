/**
 * 将 b 数组中指定数据清除
 * todo 支持 b 数组中的正则 & 缺省语法
 * @param a 
 * @param b 一个字典
 */
 function extArrayData<T>(a: T[], b: any): T[] {
  let i = 0;
  a.forEach(file => {
    const isExt = b[file];
    if (isExt) {
      a.splice(i, 1);
    }
    i++;
  });
  return a;
}

export {
  extArrayData
}