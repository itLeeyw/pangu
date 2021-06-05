import fs from 'fs';
import { 
  FILE_PROJECT_JSON,
  PackageJsonOption, ProjectTreeOption 
 } from '../configs/configs';
import { getJson, isArrAinB } from '../utils/utils';
export default class Project {
  private path: string;
  
  constructor (projectPath: string) {
      this.path = projectPath;
  }

  /**
 * 验证是否为合法项目
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
      const projectJson: object = getJson(projectJsonPath);
      const projectJsonKeys: string[] = Object.keys(projectJson);
      const validProjectJson: boolean = isArrAinB(validProjectArr, projectJsonKeys);
      if (!validProjectJson) throw new Error(`This is not a correct package.json.`);

      return true;
    } catch(err) {
      // todo
      return false;
    }
  }

  
  /**
   * 扫描项目生成项目树状结构
   * @returns 项目树
   */
  public scanProjectDir2Tree(): ProjectTreeOption {
    let packageJson: PackageJsonOption;
    packageJson = getJson(this.path + FILE_PROJECT_JSON) as PackageJsonOption;
    let projectTree: ProjectTreeOption = {} as ProjectTreeOption;
    projectTree.name = packageJson.name;
    projectTree.version = packageJson.version;
    return projectTree;
  }
}