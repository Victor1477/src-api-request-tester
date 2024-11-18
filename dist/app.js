"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const adapter_1 = require("./adapter");
const request_1 = require("./request");
const path_1 = require("path");
console.clear();
//Clean up log files before the application start
fs_1.default.rm((0, path_1.join)(process.cwd(), "logs"), { recursive: true, force: true }, (err) => {
    fs_1.default.mkdir((0, path_1.join)(process.cwd(), "logs"), (err) => { });
    const request = new request_1.Request("http://www.google.com");
    const adapter = new adapter_1.Adapter(request);
    adapter.doGet(10);
});
