export interface ProjectTreeOption {
  name: string,
  version: string,
  main?: string,						
  node_module?: {
      dependencies?: object,
      devDependencies?: object,
      peerDependencies?: object,
      optionalDependencies?: object,
      bundledDependencies?  : string[],
      // 后续可能会有  submodule 
  },
  projectDirName: string,
  basePath: string,
  tree?: object
}