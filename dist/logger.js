"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
class Logger {
    static finalResult = { sucesses: 0, fails: 0 };
    static success(message) {
        (0, fs_1.appendFile)((0, path_1.join)(__dirname, "../logs/sucesses.txt"), message + "\n", () => { });
    }
    static error(message) {
        (0, fs_1.appendFile)((0, path_1.join)(__dirname, "../logs/errors.txt"), message + "\n", () => { });
    }
}
exports.Logger = Logger;
