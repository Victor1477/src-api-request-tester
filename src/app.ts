import fs from "fs";
import { join } from "path";
import config from "../request.config.json";
import child_process from "node:child_process";

console.clear();

//Clean up log files before the application start
fs.rm(join(process.cwd(), "logs"), { recursive: true, force: true }, (err) => {
  fs.mkdir(join(process.cwd(), "logs"), (err) => {});

  for (let i = 0; i < config.appConfig.workers; i++) {
    child_process.fork(join(__dirname, "request.worker.js"));
  }
});
