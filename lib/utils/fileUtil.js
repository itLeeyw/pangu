"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileName = exports.getJson = void 0;
var fs_1 = __importDefault(require("fs"));
function getJson(jsonPath) {
    var json = JSON.parse(fs_1.default.readFileSync(jsonPath, 'utf8'));
    return json;
}
exports.getJson = getJson;
function getFileName(path) {
    var pathArr = path.split('\\');
    var name = pathArr[pathArr.length - 1];
    return name;
}
exports.getFileName = getFileName;
