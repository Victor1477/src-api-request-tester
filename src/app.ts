import fs from "fs";
import { Adapter } from "./adapter";
import { Request } from "./request";
import { join } from "path";

console.clear();

//Clean up log files before the application start
fs.rm(join(process.cwd(), "logs"), { recursive: true, force: true }, (err) => {
  fs.mkdir(join(process.cwd(), "logs"), (err) => {});

  const request = new Request("http://www.google.com");

  const adapter = new Adapter(request);

  adapter.doGet(10);
});
