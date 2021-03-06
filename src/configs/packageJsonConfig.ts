interface PackageJsonOption {
  name: string,
  version: string,
  description?: string,
  keywords?: string[],
  homepage?: string,
  bugs?: object | string,
  license?: string,
  author?: string,
  contributors?: {
    name: string,
    email?: string,
    url?: string
  },
  funding?: object,
  files?: string[],
  main?: string,
  browser?: string,
  bin?: object,
  man?: string | string[],
  directories?: object,
  repository?: object,
  scripts?: object,
  config?: object,
  dependencies?: object,
  devDependencies?: object,
  peerDependencies?: object,
  peerDependenciesMeta?: object,
  bundledDependencies?: string[],
  optionalDependencies?: object,
  engines?: object,
  os?: string[],
  cpu?: string[],
  private?: boolean,
  publishConfig?: object,
  workspaces?: string[],
}

export {
  PackageJsonOption
}