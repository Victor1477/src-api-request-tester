"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Request = void 0;
class Request {
    url;
    headers;
    params;
    body;
    constructor(url) {
        this.url = url;
    }
    setHeaders(headers) {
        this.headers = headers;
    }
    setParams(params) {
        this.params = params;
    }
    setBody(body) {
        this.body = body;
    }
}
exports.Request = Request;
