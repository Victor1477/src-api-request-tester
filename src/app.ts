import fs from "fs";
import { join } from "path";
import config from "../request.config.json";
import child_process from "node:child_process";
import { Logger } from "./logger";

console.clear();

let finishedProcessesCounter = 0;

//Clean up log files before the application start
fs.rm(join(process.cwd(), "logs"), { recursive: true, force: true }, (err) => {
  fs.mkdir(join(process.cwd(), "logs"), (err) => {});

  for (let i = 1; i <= config.appConfig.workers; i++) {
    const child = child_process.fork(join(__dirname, "request.worker.js"));
    child.on("message", (e: any) => {
      Logger.finalResult.sucesses += e.sucesses;
      Logger.finalResult.fails += e.fails;
    });
    child.on("exit", () => {
      finishedProcessesCounter++;
      if (finishedProcessesCounter === config.appConfig.workers) {
        console.log("\nFinal Result is: ", Logger.finalResult);
      }
    });
  }
});
