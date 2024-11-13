import { Adapter } from "./adapter";
import { Request } from "./request";

console.clear();

const request = new Request("http://localhost:4200/test");
request.setBody({});
const adapter = new Adapter(request);

adapter.doPut(100);
