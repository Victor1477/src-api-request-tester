"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("./adapter");
const request_1 = require("./request");
const request_config_json_1 = __importDefault(require("../request.config.json"));
const request = new request_1.Request(request_config_json_1.default.url);
request.setHeaders(request_config_json_1.default.headers);
request.setParams(request_config_json_1.default.params);
request.setBody(request_config_json_1.default.body);
const adapter = new adapter_1.Adapter(request);
switch (request_config_json_1.default.method) {
    case "GET": {
        adapter.doGet(request_config_json_1.default.appConfig.requestsPerWorker);
        break;
    }
    case "POST": {
        adapter.doPost(request_config_json_1.default.appConfig.requestsPerWorker);
        break;
    }
    case "PUT": {
        adapter.doPut(request_config_json_1.default.appConfig.requestsPerWorker);
        break;
    }
    default: {
        throw new Error("Request method isn't a valid one");
    }
}
