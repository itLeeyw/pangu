
/**
 * 判断 a ⊆ b
 * @param {any[]} a 
 * @param {any[]} b 
 * @returns boolean
 */
function isArrAinB(a: any[], b: any[]): boolean {
  return b.every(val => a.includes);
}

export {
  isArrAinB
}