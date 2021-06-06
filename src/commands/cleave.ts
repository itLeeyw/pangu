import { ProjectOption, ProjectTreeOption } from '../configs/configs';
import Project from '../class/project';

export default function cleave(options: ProjectOption): void {
  const projectPath = options.project;

  // 判断是否是合法项目
  const isProject = Project.isValidProject(projectPath);
  if (isProject === false) throw new Error(`This is not a correct project file.`);
  
  const project = new Project(projectPath);
  
  // 递归扫描文件生成一个树状图
  const projectTree: ProjectTreeOption = project.generateProjectTree();
  console.log(projectTree);
}