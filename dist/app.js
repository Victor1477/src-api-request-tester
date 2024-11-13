"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const adapter_1 = require("./adapter");
const request_1 = require("./request");
console.clear();
const request = new request_1.Request("http://localhost:4200/test");
request.setBody({});
const adapter = new adapter_1.Adapter(request);
adapter.doPut(100);
