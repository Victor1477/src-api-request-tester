import axios from "axios";
import { Request } from "./request.js";
import { addPropertyToObject } from "./utils.js";

export class Adapter {
  private isCurrentProcessing: boolean;
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
    if (this.isCurrentProcessing) {
      throw new Error("Application is current processing request");
    }
    this.isCurrentProcessing = true;
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
      }
    };

    fn(...params)
      .then((response) => {
        console.log("Sucess");
        setTimeout(() => {
          handleAxiosReturn();
        }, this.delay);
      })
      .catch((err) => {
        console.log("Fail");
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
