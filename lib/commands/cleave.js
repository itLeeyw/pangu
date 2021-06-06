"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var project_1 = __importDefault(require("../class/project"));
function cleave(options) {
    var projectPath = options.project;
    var isProject = project_1.default.isValidProject(projectPath);
    if (isProject === false)
        throw new Error("This is not a correct project file.");
    var project = new project_1.default(projectPath);
    var projectTree = project.generateProjectTree();
    console.log('projectTree:', projectTree);
}
exports.default = cleave;
