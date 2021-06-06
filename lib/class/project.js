"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var path_1 = __importDefault(require("path"));
var configs_1 = require("../configs/configs");
var util = __importStar(require("../utils/utils"));
var Project = (function () {
    function Project(projectPath) {
        this.projectTree = {};
        this.extFiles = { '.git': true, 'node_modules': true };
        this.path = path_1.default.resolve(projectPath);
    }
    Project.isValidProject = function (projectPath) {
        var projectJsonPath = projectPath + configs_1.FILE_PROJECT_JSON;
        try {
            fs_1.default.accessSync(projectJsonPath, fs_1.default.constants.F_OK);
            var validProjectArr = ['name', 'version'];
            var projectJson = util.getJson(projectJsonPath);
            var projectJsonKeys = Object.keys(projectJson);
            var validProjectJson = util.isArrAinB(validProjectArr, projectJsonKeys);
            if (!validProjectJson)
                throw new Error("This is not a correct package.json.");
            return true;
        }
        catch (err) {
            return false;
        }
    };
    Project.prototype.generateProjectTree = function () {
        var packageJson;
        packageJson = util.getJson(this.path + configs_1.FILE_PROJECT_JSON);
        var packageJsonInfo = this.formatPackageJson(packageJson);
        var baseInfo = this.formatBaseInfo();
        var tree = this.formatProjectTree();
        this.projectTree = __assign(__assign(__assign({}, packageJsonInfo), baseInfo), { tree: tree });
        console.log('tree: ', this.projectTree);
        var projectTree = util.deepClone(this.projectTree);
        return projectTree;
    };
    Project.prototype.formatPackageJson = function (packageJson) {
        var json = {};
        json.name = packageJson.name;
        json.version = packageJson.version;
        json.node_module = {};
        if (packageJson.main)
            json.main = packageJson.main;
        if (packageJson.dependencies)
            json.node_module.dependencies = packageJson.dependencies;
        if (packageJson.devDependencies)
            json.node_module.devDependencies = packageJson.devDependencies;
        if (packageJson.peerDependencies)
            json.node_module.peerDependencies = packageJson.peerDependencies;
        if (packageJson.peerDependenciesMeta)
            json.node_module.peerDependenciesMeta = packageJson.peerDependenciesMeta;
        if (packageJson.bundledDependencies)
            json.node_module.bundledDependencies = packageJson.bundledDependencies;
        if (packageJson.optionalDependencies)
            json.node_module.optionalDependencies = packageJson.optionalDependencies;
        return json;
    };
    Project.prototype.formatBaseInfo = function () {
        var basePath = this.path;
        var projectDirName = util.getFileName(basePath);
        return {
            basePath: basePath,
            projectDirName: projectDirName
        };
    };
    Project.prototype.formatProjectTree = function () {
        var projectRoot = this.path;
        var tree = this.getFileTree(projectRoot);
        this.getProjectDir(projectRoot, tree);
        return tree;
    };
    Project.prototype.getProjectDir = function (dirPath, curTree) {
        var curDirChildren = fs_1.default.readdirSync(dirPath);
        if (curDirChildren.length === 0)
            return;
        curTree.children = [];
        curDirChildren = util.extArrayData(curDirChildren, this.extFiles);
        var childrenLen = curDirChildren.length;
        for (var i = 0; i < childrenLen; i++) {
            var file = curDirChildren[i];
            var filePath = path_1.default.join(dirPath, file);
            var fileInfo = fs_1.default.statSync(filePath);
            var fileTree = this.getFileTree(filePath);
            if (fileInfo.isDirectory()) {
                curTree.children.push(fileTree);
                this.getProjectDir(filePath, fileTree);
            }
            else {
                curTree.children.push(fileTree);
            }
        }
    };
    Project.prototype.getFileTree = function (path) {
        return {
            name: util.getFileName(path),
            mtime: fs_1.default.statSync(path).mtime,
            path: path
        };
    };
    return Project;
}());
exports.default = Project;
