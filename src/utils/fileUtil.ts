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

/** 输入路径获取文件名
 * 
 * @param path 
 * @returns 
 */
function getFileName (path: string): string {
    // 将 (z:\xxx\yyy) --解析成--> (yyy)
    let pathArr = path.split('\\');                        // --> ['z:', 'xxx', 'yyy']
    
    const name = pathArr[pathArr.length - 1];   // --> 'yyy'
    return name;
}

export {
  getJson,
  getFileName
}