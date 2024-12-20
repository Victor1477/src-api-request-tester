import { appendFile } from "fs";
import { join } from "path";

export class Logger {
  static finalResult: { sucesses: number; fails: number } = { sucesses: 0, fails: 0 };

  static success(message: string) {
    appendFile(join(__dirname, "../logs/sucesses.txt"), message + "\n", () => {});
  }

  static error(message: string) {
    appendFile(join(__dirname, "../logs/errors.txt"), message + "\n", () => {});
  }
}
