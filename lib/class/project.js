"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = __importDefault(require("fs"));
var configs_1 = require("../configs/configs");
var utils_1 = require("../utils/utils");
var Project = (function () {
    function Project(projectPath) {
        this.path = projectPath;
    }
    Project.isValidProject = function (projectPath) {
        var projectJsonPath = projectPath + configs_1.FILE_PROJECT_JSON;
        try {
            fs_1.default.accessSync(projectJsonPath, fs_1.default.constants.F_OK);
            var validProjectArr = ['name', 'version'];
            var projectJson = utils_1.getJson(projectJsonPath);
            var projectJsonKeys = Object.keys(projectJson);
            var validProjectJson = utils_1.isArrAinB(validProjectArr, projectJsonKeys);
            if (!validProjectJson)
                throw new Error("This is not a correct package.json.");
            return true;
        }
        catch (err) {
            return false;
        }
    };
    Project.prototype.scanProjectDir2Tree = function () {
        var packageJson;
        packageJson = utils_1.getJson(this.path + configs_1.FILE_PROJECT_JSON);
        var projectTree = {};
        projectTree.name = packageJson.name;
        projectTree.version = packageJson.version;
        return projectTree;
    };
    return Project;
}());
exports.default = Project;
