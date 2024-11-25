import { Adapter } from "./adapter";
import { Request } from "./request";
import config from "../request.config.json";

const request = new Request(config.url);
request.setHeaders(config.headers);
request.setParams(config.params);
request.setBody(config.body);
const adapter = new Adapter(request);

switch (config.method) {
  case "GET": {
    adapter.doGet(config.appConfig.requestsPerWorker);
    break;
  }
  case "POST": {
    adapter.doPost(config.appConfig.requestsPerWorker);
    break;
  }
  case "PUT": {
    adapter.doPut(config.appConfig.requestsPerWorker);
    break;
  }
  default: {
    throw new Error("Request method isn't a valid one");
  }
}
