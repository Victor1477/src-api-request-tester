import fs from "fs";
import { join } from "path";
import config from "../request.config.json";
import { Worker } from "worker_threads";

console.clear();

//Clean up log files before the application start
fs.rm(join(process.cwd(), "logs"), { recursive: true, force: true }, (err) => {
  fs.mkdir(join(process.cwd(), "logs"), (err) => {});

  for (let i = 0; i < config.appConfig.workers; i++) {
    const worker = new Worker(join(__dirname, "request.worker.js"));
  }
});
