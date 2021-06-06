import fs from 'fs';
import path from 'path';
import { 
  FILE_PROJECT_JSON,
  PackageJsonOption, ProjectTreeOption,
  treeType 
 } from '../configs/configs';
import * as util from '../utils/utils';
export default class Project {
  private projectTree: ProjectTreeOption = {} as ProjectTreeOption;
  private path: string;
  private extFiles: object= {'.git': true, 'node_modules': true}; 

  constructor (projectPath: string) {
      this.path = path.resolve(projectPath);
  }

  /** 验证是否为合法项目
 * 
 * 一个项目必须有 project.json, 且必须有 "name"、"version" 字段
 * 若存在 project.json 则说明项目合法
 * @param projectPath 项目路径 
 * @returns boolean
 */
  static isValidProject(projectPath: string): boolean {
    const projectJsonPath: string = projectPath + FILE_PROJECT_JSON;
    try {
      fs.accessSync(projectJsonPath, fs.constants.F_OK);
      const validProjectArr: string[] = ['name', 'version'];
      const projectJson: object = util.getJson(projectJsonPath);
      const projectJsonKeys: string[] = Object.keys(projectJson);
      const validProjectJson: boolean = util.isArrAinB(validProjectArr, projectJsonKeys);
      if (!validProjectJson) throw new Error(`This is not a correct package.json.`);

      return true;
    } catch(err) {
      // todo
      return false;
    }
  }
  
  /** 扫描项目生成项目树状结构
   * 
   * @returns 项目树
   */
  public generateProjectTree(): ProjectTreeOption {
    let packageJson: PackageJsonOption;

    packageJson = util.getJson(this.path + FILE_PROJECT_JSON) as PackageJsonOption;
    
    const packageJsonInfo = this.formatPackageJson(packageJson);
    const baseInfo = this.formatBaseInfo();
    const tree: treeType = this.formatProjectTree();

    this.projectTree = {
      ...packageJsonInfo,
      ...baseInfo,
      tree
    }

    const projectTree = util.deepClone(this.projectTree);
    return projectTree as ProjectTreeOption;
  }

  /** 将 package.json 中 ProjectTree 所需要的属性 格式化成可以注入 ProjectTree 中的数据，并返回
   * 
   * @param packageJson 
   * @returns ProjectTreeOption
   */
  private formatPackageJson (packageJson: PackageJsonOption): ProjectTreeOption {
    const json: ProjectTreeOption = {} as ProjectTreeOption;
    json.name = packageJson.name;
    json.version = packageJson.version;
    json.node_module = {};
    if (packageJson.main) json.main = packageJson.main;
    if (packageJson.dependencies)         json.node_module.dependencies         = packageJson.dependencies;
    if (packageJson.devDependencies)      json.node_module.devDependencies      = packageJson.devDependencies;
    if (packageJson.peerDependencies)     json.node_module.peerDependencies     = packageJson.peerDependencies;
    if (packageJson.peerDependenciesMeta) json.node_module.peerDependenciesMeta = packageJson.peerDependenciesMeta;
    if (packageJson.bundledDependencies)  json.node_module.bundledDependencies  = packageJson.bundledDependencies;
    if (packageJson.optionalDependencies) json.node_module.optionalDependencies = packageJson.optionalDependencies;
    return json;
  }

  /** 解析出项目的根目录名称 & 项目路径，并返回
   * 
   * @returns object
   */
  private formatBaseInfo (): object {
    const basePath = this.path;
    const projectDirName = util.getFileName(basePath);
                      
    return {
      basePath,
      projectDirName
    }

  }

  /** 根据 path 递归生成项目树
   * 
   * @returns 
   */
  private formatProjectTree(): treeType{
    const projectRoot = this.path;
    const tree: treeType = this.getFileTree(projectRoot);
    this.getProjectDir(projectRoot, tree);
    return tree;
  }

  private getProjectDir(dirPath: string, curTree: treeType) {
    let curDirChildren = fs.readdirSync(dirPath);
    if (curDirChildren.length === 0) return;

    curTree.children = [];
    // 清除数组中指定元素
    curDirChildren = util.extArrayData(curDirChildren, this.extFiles);
    
    const childrenLen = curDirChildren.length;
    for (let i = 0; i < childrenLen; i++) {
      const file = curDirChildren[i];
      const filePath = path.join(dirPath, file);
      const fileInfo = fs.statSync(filePath);
      const fileTree: treeType = this.getFileTree(filePath);
      if (fileInfo.isDirectory()) {
        curTree.children.push(fileTree);
        this.getProjectDir(filePath, fileTree);
      } else {
        curTree.children.push(fileTree)
      }
    }
  }

  /** 获取单文件的 tree 结构
   * 
   * @param path 
   * @returns 
   */
  private getFileTree(path: string): treeType {
    return {
      name: util.getFileName(path), 
      mtime: fs.statSync(path).mtime,
      path: path
     }
  }

}