export class Request {
  public headers: object;
  public params: object;
  public body: any;
  constructor(public url: string) {}

  setHeaders(headers: object) {
    this.headers = headers;
  }

  setParams(params: object) {
    this.params = params;
  }

  setBody(body: any) {
    this.body = body;
  }
}
