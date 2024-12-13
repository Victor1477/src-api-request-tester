"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const request_config_json_1 = __importDefault(require("../request.config.json"));
const node_child_process_1 = __importDefault(require("node:child_process"));
console.clear();
//Clean up log files before the application start
fs_1.default.rm((0, path_1.join)(process.cwd(), "logs"), { recursive: true, force: true }, (err) => {
    fs_1.default.mkdir((0, path_1.join)(process.cwd(), "logs"), (err) => { });
    for (let i = 0; i < request_config_json_1.default.appConfig.workers; i++) {
        node_child_process_1.default.fork((0, path_1.join)(__dirname, "request.worker.js"));
    }
});
