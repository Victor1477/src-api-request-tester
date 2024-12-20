"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = require("path");
const request_config_json_1 = __importDefault(require("../request.config.json"));
const node_child_process_1 = __importDefault(require("node:child_process"));
const logger_1 = require("./logger");
console.clear();
let finishedProcessesCounter = 0;
//Clean up log files before the application start
fs_1.default.rm((0, path_1.join)(process.cwd(), "logs"), { recursive: true, force: true }, (err) => {
    fs_1.default.mkdir((0, path_1.join)(process.cwd(), "logs"), (err) => { });
    for (let i = 1; i <= request_config_json_1.default.appConfig.workers; i++) {
        const child = node_child_process_1.default.fork((0, path_1.join)(__dirname, "request.worker.js"));
        child.on("message", (e) => {
            logger_1.Logger.finalResult.sucesses += e.sucesses;
            logger_1.Logger.finalResult.fails += e.fails;
        });
        child.on("exit", () => {
            finishedProcessesCounter++;
            if (finishedProcessesCounter === request_config_json_1.default.appConfig.workers) {
                console.log("\nFinal Result is: ", logger_1.Logger.finalResult);
            }
        });
    }
});
