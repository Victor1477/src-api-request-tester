"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Adapter = void 0;
const axios_1 = __importDefault(require("axios"));
const utils_js_1 = require("./utils.js");
const logger_js_1 = require("./logger.js");
class Adapter {
    request;
    delay;
    isCurrentProcessing;
    finalResult;
    requestsCounter;
    constructor(request, delay) {
        this.request = request;
        this.delay = delay;
    }
    doGet(requestNumber) {
        this.handleRequest(requestNumber, axios_1.default.get, this.request.url, this.getOptions());
    }
    doPost(requestNumber) {
        if (!this.request.body) {
            throw new Error("The post request has no body");
        }
        this.handleRequest(requestNumber, axios_1.default.post, this.request.url, this.request.body, this.getOptions());
    }
    doPut(requestNumber) {
        if (!this.request.body) {
            throw new Error("The put request has no body");
        }
        this.handleRequest(requestNumber, axios_1.default.put, this.request.url, this.request.body, this.getOptions());
    }
    handleRequest(requestNumber, fn, ...params) {
        this.finalResult = { sucesses: 0, fails: 0 };
        if (this.isCurrentProcessing) {
            throw new Error("Application is current processing request");
        }
        this.isCurrentProcessing = true;
        this.requestsCounter = 0;
        this.doRequest(requestNumber, fn, params);
    }
    doRequest(requestNumber, fn, params) {
        const handleAxiosReturn = () => {
            requestNumber--;
            if (requestNumber > 0) {
                console.log("Remaining requests: " + requestNumber);
                this.doRequest(requestNumber, fn, params);
            }
            else {
                this.isCurrentProcessing = false;
                process.send(this.finalResult);
            }
        };
        this.requestsCounter++;
        fn(...params)
            .then((response) => {
            console.log("Sucess");
            logger_js_1.Logger.success(`--------------- Request ${this.requestsCounter} ----------------- \n\n ${JSON.stringify(response.data)}\n\n\n`);
            this.finalResult.sucesses++;
            setTimeout(() => {
                handleAxiosReturn();
            }, this.delay);
        })
            .catch((err) => {
            console.log("Fail");
            // try {
            logger_js_1.Logger.error(`--------------- Request ${this.requestsCounter} ----------------- \n\n ${JSON.stringify(err)}\nResponseData: ${JSON.stringify(err.response.data)}\n\n`);
            // } catch (e) {}
            this.finalResult.fails++;
            setTimeout(() => {
                handleAxiosReturn();
            }, this.delay);
        });
    }
    getOptions() {
        const options = {};
        if (this.request.headers) {
            (0, utils_js_1.addPropertyToObject)(options, "headers", this.request.headers);
        }
        if (this.request.params) {
            (0, utils_js_1.addPropertyToObject)(options, "params", this.request.params);
        }
        return options;
    }
}
exports.Adapter = Adapter;
