import axios from "axios";
import { Request } from "./request.js";
import { addPropertyToObject } from "./utils.js";
import { Logger } from "./logger.js";

export class Adapter {
  private isCurrentProcessing: boolean;
  private finalResult: { sucesses: number; fails: number };
  private requestsCounter: number;
  constructor(private request: Request, private delay?: number) {}

  doGet(requestNumber: number) {
    this.handleRequest(requestNumber, axios.get, this.request.url, this.getOptions());
  }

  doPost(requestNumber: number) {
    if (!this.request.body) {
      throw new Error("The post request has no body");
    }
    this.handleRequest(requestNumber, axios.post, this.request.url, this.request.body, this.getOptions());
  }

  doPut(requestNumber: number) {
    if (!this.request.body) {
      throw new Error("The put request has no body");
    }
    this.handleRequest(requestNumber, axios.put, this.request.url, this.request.body, this.getOptions());
  }

  private handleRequest(requestNumber: number, fn: (...params: any[]) => Axios.IPromise<Axios.AxiosXHR<unknown>>, ...params: any[]) {
    this.finalResult = { sucesses: 0, fails: 0 };
    if (this.isCurrentProcessing) {
      throw new Error("Application is current processing request");
    }
    this.isCurrentProcessing = true;
    this.requestsCounter = 0;
    this.doRequest(requestNumber, fn, params);
  }

  private doRequest(requestNumber: number, fn: (...params: any[]) => Axios.IPromise<Axios.AxiosXHR<unknown>>, params: any[]) {
    const handleAxiosReturn = () => {
      requestNumber--;
      if (requestNumber > 0) {
        console.log("Remaining requests: " + requestNumber);
        this.doRequest(requestNumber, fn, params);
      } else {
        this.isCurrentProcessing = false;
        process.send!(this.finalResult);
      }
    };

    this.requestsCounter++;

    fn(...params)
      .then((response) => {
        console.log("Sucess");
        Logger.success(`--------------- Request ${this.requestsCounter} ----------------- \n\n ${JSON.stringify(response.data)}\n\n\n`);
        this.finalResult.sucesses++;
        setTimeout(() => {
          handleAxiosReturn();
        }, this.delay);
      })
      .catch((err) => {
        console.log("Fail");
        Logger.error(`--------------- Request ${this.requestsCounter} ----------------- \n\n ${JSON.stringify(err)}\nResponseData: ${JSON.stringify(err.response.data)}\n\n`);
        this.finalResult.fails++;
        setTimeout(() => {
          handleAxiosReturn();
        }, this.delay);
      });
  }

  private getOptions() {
    const options: object = {};
    if (this.request.headers) {
      addPropertyToObject(options, "headers", this.request.headers);
    }
    if (this.request.params) {
      addPropertyToObject(options, "params", this.request.params);
    }
    return options;
  }
}
