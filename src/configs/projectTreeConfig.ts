interface ProjectTreeOption {
  name: string,
  version: string,
  main?: string,						
  node_module?: {
    dependencies?: object,
    devDependencies?: object,
    peerDependencies?: object,
    peerDependenciesMeta?: object,
    bundledDependencies?: string[],
    optionalDependencies?: object,
      // 后续可能会有  submodule 
  },
  projectDirName: string,
  basePath: string,
  tree?: treeType
}

type treeType = {
  name: string,
  mtime: Date,
  path: string,
  children?: treeType[]
}


export {
  ProjectTreeOption,
  treeType
}