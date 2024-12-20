import axios from "axios";
import { describe, it, beforeEach, expect, vi } from "vitest";
import { Adapter } from "./adapter";
import { Request } from "./request";

describe("Adapter", () => {
  let adapter: Adapter;
  const url = "http://test.com";
  const body = { message: "Empty body" };
  const options = {
    headers: { Authorization: "Bearer mockedTokenForTestsProposes" },
    params: { origin: "tests" },
  };
  const request = new Request(url);

  beforeEach(() => {
    request.setHeaders({ Authorization: "Bearer mockedTokenForTestsProposes" });
    request.setParams({ origin: "tests" });
    request.setBody(body);
    adapter = new Adapter(request);
  });

  it("Should add headers and params to the options if they exists", () => {
    const actual: any = adapter["getOptions"]();

    expect(actual).toEqual(options);
  });

  it("Should call handleRequest correctly inside doGet()", () => {
    const requests: number = 1;
    const options: any = adapter["getOptions"]();
    vi.spyOn(adapter as any, "handleRequest");
    adapter.doGet(requests);

    expect((adapter as any).handleRequest).toHaveBeenCalledWith(requests, axios.get, url, options);
  });

  it("Should call handleRequest correctly inside doPost()", () => {
    const requests: number = 1;
    const options: any = adapter["getOptions"]();
    vi.spyOn(adapter as any, "handleRequest");
    adapter.doPost(requests);

    expect((adapter as any).handleRequest).toHaveBeenCalledWith(requests, axios.post, url, body, options);
  });

  it("Should call handleRequest correctly inside doPut()", () => {
    const requests: number = 1;
    const options: any = adapter["getOptions"]();
    vi.spyOn(adapter as any, "handleRequest");
    adapter.doPut(requests);

    expect((adapter as any).handleRequest).toHaveBeenCalledWith(requests, axios.put, url, body, options);
  });

  it("Should throw exception when calling doPost without a request body", () => {
    request.setBody(null);
    const resultFn = () => {
      adapter.doPost(1);
    };

    expect(resultFn).toThrow(/The post request has no body/);
  });

  it("Should throw exception when calling doPut without a request body", () => {
    request.setBody(null);
    const resultFn = () => {
      adapter.doPut(1);
    };

    expect(resultFn).toThrow(/The put request has no body/);
  });

  it("Should throw exception when calling handleRequest() and it is already processing a request", () => {
    const resultFn = () => {
      adapter["handleRequest"](100, axios.get, url, body);
      adapter["handleRequest"](1, axios.get, url, body);
    };

    expect(resultFn).toThrow(/Application is current processing request/);
  });
});
