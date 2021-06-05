import fs from 'fs';

/**
 * 读取 json 文件中的 json 数据， 并返回。
 * @param jsonPath 
 * @returns object
 */
function getJson(jsonPath: string): object {
  const json = JSON.parse(fs.readFileSync(jsonPath, 'utf8'));
  return json;
}




export {
  getJson
}