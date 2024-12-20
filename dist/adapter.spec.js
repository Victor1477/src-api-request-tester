"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const vitest_1 = require("vitest");
const adapter_1 = require("./adapter");
const request_1 = require("./request");
(0, vitest_1.describe)("Adapter", () => {
    let adapter;
    const url = "http://test.com";
    const body = { message: "Empty body" };
    const options = {
        headers: { Authorization: "Bearer mockedTokenForTestsProposes" },
        params: { origin: "tests" },
    };
    const request = new request_1.Request(url);
    (0, vitest_1.beforeEach)(() => {
        request.setHeaders({ Authorization: "Bearer mockedTokenForTestsProposes" });
        request.setParams({ origin: "tests" });
        request.setBody(body);
        adapter = new adapter_1.Adapter(request);
    });
    (0, vitest_1.it)("Should add headers and params to the options if they exists", () => {
        const actual = adapter["getOptions"]();
        (0, vitest_1.expect)(actual).toEqual(options);
    });
    (0, vitest_1.it)("Should call handleRequest correctly inside doGet()", () => {
        const requests = 1;
        const options = adapter["getOptions"]();
        vitest_1.vi.spyOn(adapter, "handleRequest");
        adapter.doGet(requests);
        (0, vitest_1.expect)(adapter.handleRequest).toHaveBeenCalledWith(requests, axios_1.default.get, url, options);
    });
    (0, vitest_1.it)("Should call handleRequest correctly inside doPost()", () => {
        const requests = 1;
        const options = adapter["getOptions"]();
        vitest_1.vi.spyOn(adapter, "handleRequest");
        adapter.doPost(requests);
        (0, vitest_1.expect)(adapter.handleRequest).toHaveBeenCalledWith(requests, axios_1.default.post, url, body, options);
    });
    (0, vitest_1.it)("Should call handleRequest correctly inside doPut()", () => {
        const requests = 1;
        const options = adapter["getOptions"]();
        vitest_1.vi.spyOn(adapter, "handleRequest");
        adapter.doPut(requests);
        (0, vitest_1.expect)(adapter.handleRequest).toHaveBeenCalledWith(requests, axios_1.default.put, url, body, options);
    });
    (0, vitest_1.it)("Should throw exception when calling doPost without a request body", () => {
        request.setBody(null);
        const resultFn = () => {
            adapter.doPost(1);
        };
        (0, vitest_1.expect)(resultFn).toThrow(/The post request has no body/);
    });
    (0, vitest_1.it)("Should throw exception when calling doPut without a request body", () => {
        request.setBody(null);
        const resultFn = () => {
            adapter.doPut(1);
        };
        (0, vitest_1.expect)(resultFn).toThrow(/The put request has no body/);
    });
    (0, vitest_1.it)("Should throw exception when calling handleRequest() and it is already processing a request", () => {
        const resultFn = () => {
            adapter["handleRequest"](100, axios_1.default.get, url, body);
            adapter["handleRequest"](1, axios_1.default.get, url, body);
        };
        (0, vitest_1.expect)(resultFn).toThrow(/Application is current processing request/);
    });
});
