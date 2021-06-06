
/**
 * 判断 a ⊆ b
 * @param { T } a 
 * @param { T } b 
 * @returns boolean
 */
function isArrAinB<T>(a: T[], b: T[]): boolean {
  return b.every(val => a.includes);
}

export {
  isArrAinB
}